const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PaintingmovSchema = new Schema(
  {
    name: { type: 'string', trim: true, required: true },
    description: { type: 'string', trim: true, required: true },
    date: { type: 'string', trim: true, required: true },
    artist: [{ type: Schema.Types.ObjectId, trim: true, ref: 'artist'}],
  },
  { timestamps: true }
);

const paintingmov = mongoose.model('Painting movement', PaintingmovSchema);
module.exports = paintingmov;
