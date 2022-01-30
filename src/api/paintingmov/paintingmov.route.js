const PaintingmovRoutes = require('express').Router();
const { isAuth } = require('../../utils/middleware/auth');
const {
  postNewPaintingmov,
  getPaintingmov,
  getAllPaintingmov,
  patchPaintingmov,
} = require('./paintingmov.controller');
const upload = require('../../utils/middleware/file');

PaintingmovRoutes.get('/:id', getPaintingmov);
PaintingmovRoutes.get('/', getAllPaintingmov);
PaintingmovRoutes.post('/', [isAuth], upload.single('img'), postNewPaintingmov);
PaintingmovRoutes.patch('/:id',[isAuth],upload.single('img'),patchPaintingmov);

module.exports = PaintingmovRoutes;