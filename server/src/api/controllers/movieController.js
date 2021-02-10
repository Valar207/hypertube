const fs = require("fs");
const path = require("path");

const torrentStream = require("torrent-stream");

const Movie = require("../models/Movie");
const torrentConfig = require("../config/torrentConfig");

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
    if (!result) return res.status(401).json({ status: "error", message: "Erreur lors de l'enregistrement du film" });
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
    return res.status(200).json({ status: "success", message: "Film/Commentaires supprimés" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};

// download movie
exports.downloadMovie = async (req, res, next) => {
  try {
    const { movieDetails, torrent } = req.body;

    const options = torrentConfig(movieDetails.id);

    const moviesDownload = {};

    const magnetURI = "magnet:?xt=urn:btih:" + torrent.hash + "&dn=" + movieDetails.title + "_" + torrent.quality;

    const engine = torrentStream(magnetURI, options);

    let piecesTotalNumber;
    let piecesNumber = 0;

    engine.on("ready", () => {
      let stream;
      console.log("re");
      for (const file of engine.files) {
        stream = file.createReadStream();
        // console.log(file);
        // console.log(stream);
        // console.log(file.length);
      }
    });

    engine.on("torrent", (torrent) => {
      console.log("torrent parsed");
      piecesTotalNumber = torrent.pieces.length;
      // piecesDowloaded = Math.ceil(piecesTotalNumber / 100);
      // console.log(piecesTotalNumber);
      // console.log(piecesDowloaded);
    });

    engine.on("download", (pieceIndex) => {
      // {27042: 94, 390: 130}
      // moviesDownload[movieDetails.id]++;
      // console.log(moviesDownload);
      piecesNumber++;
      console.log(piecesNumber);
      if (piecesNumber === Math.ceil(piecesTotalNumber / 100)) {
        res.status(200).json({ status: "success", message: "Movie Downloaded" });

        // console.log("fichier créé");
      }
    });

    // engine.on("upload", (pieceIndex, offset, length) => {
    //   console.log("UPLOADED", pieceIndex, offset, length);
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};

exports.streamMovie = async (req, res, next) => {
  try {
    const range = req.headers.range;
    const pathMovie = process.cwd() + "/Movies/" + req.params.movie_id;

    fs.readdir(pathMovie, (err, file) => {
      if (err) console.log(err);
      else {
        const fullPath = pathMovie + "/" + file[0];
        fs.readdir(fullPath, (err, f) => {
          f.forEach((el) => {
            if (path.extname(el) == ".mp4") {
              // get video stats (about 61MB)
              const videoPath = path.resolve(fullPath, el);
              const videoSize = fs.statSync(videoPath).size;

              // console.log(videoPath);
              // console.log(videoSize);

              // Parse Range
              // Example: "bytes=32324-"
              const CHUNK_SIZE = 10 ** 6; // 1MB
              const start = Number(range.replace(/\D/g, ""));
              const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

              // Create headers
              const contentLength = end - start + 1;
              const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
              };

              // HTTP Status 206 for Partial Content
              res.writeHead(206, headers);

              // create video read stream for this particular chunk
              const videoStream = fs.createReadStream(videoPath, { start, end });

              // Stream the video chunk to the client
              videoStream.pipe(res);
            }
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server internal error" });
  }
};
