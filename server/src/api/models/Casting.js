const mongoose = require("mongoose");

const { Schema } = mongoose;
const CastingSchema = new Schema({
  producer: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  director: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  actors: [
    {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
    },
  ],
});

const Casting = mongoose.model("Casting", CastingSchema, "User");

module.exports = Casting;
