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