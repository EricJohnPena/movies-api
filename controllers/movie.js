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
};

module.exports.updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, director, year, description, genre } = req.body;
        
        let updatedMovie = {
            title: title,
            director: director,
            year: year,
            description: description,
            genre: genre
        }

        const result = await Movie.findByIdAndUpdate(
            id,
            updatedMovie,
            {new: true, runValidators: true}
         )

         if(result){
            return res.status(200).send({
                message: "Movie updated successfully",
                updatedMovie: result
            });
         }
        return res.status(404).send({
            message: "Movie not found"
        });


    } catch (error) {
        return errorHandler(err, req, res);
    }
};


module.exports.deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({ message: "Movie ID is required in URL parameter" });
        }

        const deletedMovie = await Movie.findByIdAndDelete(id);
        if(deletedMovie){
            return res.status(200).send({
            message: "Movie deleted successfully"
            });
        }
        return res.status(404).send({ message: "Workout not found" });

    } catch (error) {
        return errorHandler(error, req, res);
    }
};

module.exports.addComment = async (req, res) => {
    try {
        const movieId = req.params.id; 
        const newComment = {
            userId: req.user?.id || req.user?._id,
            comment: req.body.comment
        };

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }

        movie.comments.push(newComment);

        const updatedMovie = await movie.save();
        return res.status(200).send({
            message: "Comment added successfully",
            updatedMovie: updatedMovie
        });
    } catch (err) {
        return errorHandler(err, req, res);
    }
};

module.exports.getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).send({
                message: "Movie not found"
            });
        }

        return res.status(200).send({
            comments: movie.comments
        });
    } catch (error) {
        return errorHandler(error, req, res);
    }
};