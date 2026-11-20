const express = require("express");
const movieController = require("../controllers/movie.js");
const { verify, verifyAdmin } = require('../auth.js');

const router = express.Router();

router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);
router.get('/getMovies', verify, movieController.getMovies);
router.get('/getMovieById/:id', verify, movieController.getMovie);
router.patch('/updateMovie/:id', verify, verifyAdmin, movieController.updateMovie);
router.patch('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie);


module.exports = router;