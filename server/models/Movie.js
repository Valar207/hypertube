const mongoose = require("mongoose");

const { Schema } = mongoose;
const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  note: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  synopsis: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  casting: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Casting",
  },
  comments: [
    {
      user_login: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  subtitles: [
    {
      language: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

const Movie = mongoose.model("Movie", MovieSchema, "Movie");

module.exports = Movie;
