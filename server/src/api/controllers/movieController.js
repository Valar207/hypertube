const Movie = require("../models/Movie");
const torrentStream = require("torrent-stream");

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

    const options = {
      connections: 100,
      uploads: 10,
      path: process.cwd() + "/Movies/torrents", // Where to save the files. Overrides `tmp`.
      verify: true,
      tracker: true, // Whether or not to use trackers from torrent file or magnet link
      // Defaults to true
      trackers: [
        "udp://tracker.openbittorrent.com:80",
        "udp://tracker.ccc.de:80",
        "udp://tracker.leechers-paradise.org:6969/announce",
        "udp://tracker.pirateparty.gr:6969/announce",
        "udp://tracker.coppersurfer.tk:6969/announce",
        "http://asnet.pw:2710/announce",
        "http://tracker.opentrackr.org:1337/announce",
        "udp://tracker.opentrackr.org:1337/announce",
        "udp://tracker1.xku.tv:6969/announce",
        "udp://tracker1.wasabii.com.tw:6969/announce",
        "udp://tracker.zer0day.to:1337/announce",
        "udp://p4p.arenabg.com:1337/announce",
        "http://tracker.internetwarriors.net:1337/announce",
        "udp://tracker.internetwarriors.net:1337/announce",
        "udp://allesanddro.de:1337/announce",
        "udp://9.rarbg.com:2710/announce",
        "udp://tracker.dler.org:6969/announce",
        "http://mgtracker.org:6969/announce",
        "http://tracker.mg64.net:6881/announce",
        "http://tracker.devil-torrents.pl:80/announce",
        "http://ipv4.tracker.harry.lu:80/announce",
        "http://tracker.electro-torrent.pl:80/announce",
      ],
    };

    var magnetURI = "magnet:?xt=urn:btih:" + torrent.hash + "&dn=" + movieDetails.title + "_" + torrent.quality;

    console.log(magnetURI);

    var engine = torrentStream(magnetURI, options);

    engine.on("ready", function () {
      engine.files.forEach(function (file) {
        // console.log("filename:", file.name);
        // console.log("files:", file);
        var stream = file.createReadStream();
        // stream is readable stream to containing the file content
      });
    });
    engine.on("idle", (end) => {
      console.log(end);
    });

    return res.json({ status: "success", message: "Movie Downloaded" });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Server internal error" });
  }
};
