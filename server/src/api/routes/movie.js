const express = require("express");

const { checkLoggedIn } = require("../utils/authHandler");

const router = express.Router();

const { getMovie, postMovie, deleteMovie } = require("../controllers/movieController");

router.get("/:movie_id", checkLoggedIn, getMovie);

router.post("/", checkLoggedIn, postMovie);

router.delete("/:movie_id", checkLoggedIn, deleteMovie);

module.exports = router;
