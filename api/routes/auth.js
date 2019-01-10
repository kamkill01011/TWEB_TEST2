/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { jwtOptions } = require('../config');
const userController = require('../controllers/userController');

const router = express.Router();
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
// eslint-disable-next-line prefer-destructuring
const ExtractJwt = passportJWT.ExtractJwt;

passport.use(new LocalStrategy(
    {
        usernameFiled: 'username',
        passwordFiled: 'password',
    },
    (username, password, done) => {
        const user = userController.getUserByUsernameAndPassword(username, password);
        done(null, user);
    },
));

passport.use(new JWTStrategy(
    {
        secretOrKey: jwtOptions.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (jwtPayload, done) => {
        const { userId } = jwtPayload;
        const user = userController.getUserById(userId);
        done(null, user);
    },
));

// http://localhost:5000/auth/login
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const { password, ...user } = req.user;
    const token = jwt.sign({ userId: user._id }, jwtOptions.secret);
    res.send({ user, token });
});

// http://localhost:5000/auth/register
router.post('/register', (req, res) => {
    userController.creatNewUser(req, res);
});

module.exports = router;
