const Artpiece = require("./artpiece.model");
const { setError } = require("../../utils/errors/error");

const postNewArtpiece = async (req, res, next) => {
  try {
    const newArtpiece = new Artpiece(req.body);
    console.log("1");
       if (req.file) {
      newArtpiece.img = req.file.path;
    }
    console.log("2");
    const artpieceDb = await newArtpiece.save();
    console.log("3");
    return res.status(201).json(artpieceDb);
  } catch (error) {
    return next(setError(500, "Artpiece not saved"));
  }
};

const getAllArtpiece = async (req, res, next) => {
  try {
    const artpieceDb = await Artpiece.find().populate("artist")
    res.status(200).json(artpieceDb);
  } catch (error) {
    return next(setError(500, "Artpiece failed server"));
  }
};

const getArtpiece = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artpieceDb = await Artpiece.findById(id);
    if (!artpieceDb) {
      return next(setError(404, "Artpiece not found"));
    }
    return res.status(200).json(artpieceDb);
  } catch (error) {
    return next(setError(500, "Artpiece server error"));
  }
};

const patchArtpiece = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchArtpiece = new Artpiece(req.body);
    patchArtpiece._id = id;
    if (req.file) {
      patchArtpiece.img = req.file.path;
    }
    const artpieceDb = await Artpiece.findByIdAndUpdate(id, patchArtpiece);
    if (!artpieceDb) {
      return next(setError(404, "Artpiece not found"));
    }
    if (artpieceDb.img) deleteFile(artpieceDb.img);
    return res.status(200).json({ new: patchArtpiece, old: artpieceDb });
  } catch (error) {
    return next(setError(500, "Artpiece Patch server error"));
  }
};

module.exports = {
    postNewArtpiece,
    getArtpiece,
    getAllArtpiece,
    patchArtpiece,
};
