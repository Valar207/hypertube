const Movie = require("../models/Movie");

// controller fetch movie (GET)
exports.getMovie = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const movie = await Movie.getMovie(movie_id);
    if (!movie) return res.status(200).json({ movie_id: movie_id, comments: [] });
    return res.status(200).json({ movie_id: movie.movie_id, comments: movie.comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};

// controller send or update movie (POST)
exports.postMovie = async (req, res, next) => {
  try {
    const { body } = req.body;
    const result = await Movie.insertMovie(body);
    if (!result) return res.status().json({ status: "error", message: "Erreur lors de l'enregistrement du film" });
    return res.status(200).json({ status: "success", message: "Film/Commentaires sauvegardés" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};

// controller delete movie (DELETE)
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie_id = req.params;
    const result = await Movie.deleteMovie(movie_id);
    return res.json({ status: "success", message: "Film/Commentaires supprimés" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};
