const mongoose = require('mongoose');
const Schema=mongoose.Schema;

let ArtpieceSchema = new mongoose.Schema(
  {
    img: { type: String, trim: true, required: true},
    name: { type: String, trim: true, required: true },
    artist:{ type: String, trim: true,},
    description: { type: String, trim: true,},
    date: { type: String, trim: true, required: true },
    place: { type: String, trim: true },
  },
  { timestamps: true }
);

const Artpiece = mongoose.model('Art Piece', ArtpieceSchema);
module.exports = Artpiece;
