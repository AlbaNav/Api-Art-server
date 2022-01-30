const Paintingmov = require("./paintingmov.model");
const { setError } = require("../../utils/errors/error");

const postNewPaintingmov = async (req, res, next) => {
  try {
    const newPaintingmov = new Paintingmov(req.body);console.log('1');
    if (req.file) {
      newPaintingmov.img = req.file.path;
    }console.log('2');
    const paintingmovDb = await newPaintingmov.save();console.log('3');
    return res.status(201).json(paintingmovDb);
  } catch (error) {
    return next(setError(500, "Painting movement not found"));
  }
};
const getPaintingmov= async (req, res, next) => {
    try {
        const {id}= req.params;
        const paintingmovDb= await Paintingmov.findById(id).populate('artist')
        if(!paintingmovDb){
            return next(setError(500, "Painting movementnot found"))
        }
    } catch (error) {
        return next(setError(500, 'Painting movement failed to find'))
    }
}
const getAllPaintingmov = async (req, res, next) => {
    try {
        const paintingmovDb = await Paintingmov.find().populate('artist')
        res.status(200).json(paintingmovDb)
    } catch (error) {
        console.log(error)
        return next(setError(500, 'Painting movement server error'))
        
    }
}

const patchPaintingmov = async(req, res, next) => {
    try {
        const {id} = req.params;
        const patchPaintingmov = new Paintingmov(req.body);
        patchPaintingmov._id = id;
        if (req.file){
            patchPaintingmov.img = req.file.path
        }
        const paintingmovDb = await Artist.findByIdAndUpdate(id, patchArtist)
        if(!paintingmovDb){
            return next(setError(404, 'Artist not found'))
        }
        if(paintingmovDb.img){
            deleFile(paintingmovDb.img)
        }
        return res.status(200).json({new: patchPaintingmov, old:paintingmovDb})
        
    } catch (error) {
        return next(setError(500, 'Painting movement update failed'))
    }
}

module.exports ={
    getPaintingmov,
    getAllPaintingmov,
    postNewPaintingmov,
    patchPaintingmov
}