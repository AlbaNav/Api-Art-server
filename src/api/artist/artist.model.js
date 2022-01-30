const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: { type: String,trim: true, required: true  },
    style: { type: String, trim: true, required: true },
    birth: { type: String, trim: true, required: true },
    death: { type: String, trim: true },
    place: { type: String, trim: true },
    img: { type: String, trim: true },
  },
  { timestamps: true }
);

const Artist = mongoose.model("artist", artistSchema);
module.exports = Artist;
