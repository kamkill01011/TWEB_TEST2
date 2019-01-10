/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
const User = require('../models/User');
const movieController = require('../controllers/movieController');

// crée un nouveau user avec le json du body de la request: {"username": "test", "password": "123"}
exports.creatNewUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ _id: user._id, username: user.username });
        }
    });
};

// utilisé pour l'authentification par login
exports.getUserByUsernameAndPassword = (username, password) => {
    User.findOne({ username, password }, (err, user) => {
        if (err) {
            return false;
        }
        return { _id: user._id, username: user.username };
    });
};

// utilisé pour l'authentification par JWT
exports.getUserById = (userId) => {
    User.findOne({ _id: userId }, (err, user) => {
        if (err) {
            return false;
        }
        return { _id: user._id, username: user.username };
    });
};

// retourne tous les films de la watchlist d'un user
exports.getUserWatchlist = (username) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return false;
        }
        const watchlist = [];// watchlist a retourner
        let i;
        // on partour la liste d'id du user pour trouver les films corespondants
        for (i = 0; i < user.watchlist.length; i++) {
            watchlist.push(movieController.getMovieById(user.watchlist[i]));
        }
        return watchlist;
    });
};

// ajoute un film à la watchlist d'un user
exports.addFilmToUserWatchlist = (username, filmId) => {
    User.findOneAndUpdate({ username }, { $push: { watchlist: filmId } }, (err, user) => {
        if (err) {
            return false;
        }
        return { watchlist: user.watchlist };
    });
};
