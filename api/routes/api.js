const express = require('express');
const passport = require('passport');
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');

const router = express.Router();
const authenticated = () => passport.authenticate('jwt', { session: false });

// http://localhost:5000/api/movies?page=2
router.get('/movies', (req, res) => {
    movieController.moviesOfPage(req, res);
});

// http://localhost:5000/api/user/MyUsername?film=405774
router.post('/user/:username', (req, res) => {
    const result = userController.addFilmToUserWatchlist(req.param('username'), req.query.film);
    res.send({ result });
});

// http://localhost:5000/api/watchlist/MyUsername
router.get('/watchlist/:username', (req, res) => {
    const result = userController.getUserWatchlist(req.params.username);
    //res.send(result);
});

module.exports = router;
