const Movie = require('../models/Movie');

const moviesPerPage = 10;

exports.getMovieById = (id) => {
    return Movie.findOne({tmdb_id: id});
};

// done une page de films, 10 films par page et commence a la page 1
exports.moviesOfPage = (req, res) => {
    const page = req.query.page;
    const skips = (page - 1) * moviesPerPage;
    Movie.find({}, {}, { skip: skips, limit: moviesPerPage }, (err, movies) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(movies);
        }
    });
};
