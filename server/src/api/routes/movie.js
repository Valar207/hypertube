const express = require("express");

const { checkLoggedIn } = require("../utils/authHandler");

const router = express.Router();

const { getMovie, postMovie, deleteMovie, downloadMovie } = require("../controllers/movieController");

router.get("/getMovie/:movie_id", checkLoggedIn, getMovie);

//DL movie
router.post("/downloadMovie", checkLoggedIn, downloadMovie);

router.post("/", checkLoggedIn, postMovie);

router.delete("/:movie_id", checkLoggedIn, deleteMovie);

module.exports = router;
