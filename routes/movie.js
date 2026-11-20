const express = require("express");
const movieController = require("../controllers/movie.js");
const { verify, verifyAdmin } = require('../auth.js');

const router = express.Router();

router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);
router.get('/getMovies', verify, movieController.getMovies);
router.get('/getMovieById/:id', verify, movieController.getMovie);
router.patch('/updateMovie/:id', verify, verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie);

// For Comments
router.patch('/addComment/:id', verify, movieController.addComment);
router.get('/getComments/:id', verify, movieController.getComments);


module.exports = router;