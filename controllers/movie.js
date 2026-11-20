const Movie = require('../models/Movie.js');
const { errorHandler } = require("../auth.js");


module.exports.addMovie = async (req, res) => {
    try {
        const { title, director, year, description, genre } = req.body;

        const existMovie = await Movie.findOne({ title });
        if (existMovie) {
            return res.status(409).send({ message: "Movie already exists" });
        }

        const newMovie = new Movie({
            title,
            director,
            year,
            description,
            genre
        });

        const result = await newMovie.save();
        return res.status(201).send(result);
    } catch (err) {
        return errorHandler(err, req, res);
    }
};

module.exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        if (movies.length > 0){
            return res.status(200).send(movies);
        }
        return res.status(404).send({
            message: "No movies found"
        })
    } catch (error) {
         return errorHandler(err, req, res);
    }
};

module.exports.getMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findById(id);
        if (movie) {
            return res.status(200).send(movie);
        }
        return res.status(404).send({
            message: "No movie found"
        })
    } catch (error) {
        return errorHandler(err, req, res);
    }
}