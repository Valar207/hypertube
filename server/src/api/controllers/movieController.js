const Movie = require("../models/Movie");

// controller fetch movie (GET)
exports.getMovie = async (movie_id) => {
  try {
    const movie = await Movie.getMovie(movie_id);
    if (!movie) return res.status(404).json({ status: "error", message: "Film introuvable" });
    return res.status(200).json({ movie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};

// controller send or update movie (POST)
exports.postMovie = async (movieData) => {
  try {
    const result = await Movie.insertMovie(movieData);
    if (!result) return res.status().json({ status: "error", message: "Erreur lors de l'enregistrement du film" });
    return res.status(200).json({ status: "success", message: "Film/Commentaires sauvegardés" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};

// controller delete movie (DELETE)
exports.deleteMovie = async (movie_id) => {
  try {
    const result = await Movie.deleteMovie(movie_id);
    return res.json({ status: "success", message: "Film/Commentaires supprimés" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};
