const Artist = require("./artist.model");
const { setError } = require("../../utils/errors/error");

const postNewArtist = async (req, res, next) => {
  try {
    const newArtist = new Artist();
    console.log("1");
    newArtist.name = req.body.name;
    newArtist.birth = req.body.birth;
    newArtist.death = req.body.death;
    newArtist.place = req.body.place;

    if (req.file) {
      newArtist.img = req.file.path;
    }
    console.log("2");
    const artistDB = await newArtist.save();
    console.log("3");
    return res.status(201).json(artistDB);
  } catch (error) {
    return next(setError(500, "Artist not saved"));
  }
};

const getAllArtist = async (req, res, next) => {
  try {
    const artistsDB = await Artist.find();
    res.status(200).json(artistsDB);
  } catch (error) {
    return next(setError(500, "Artist failed server"));
  }
};

const getArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artistDB = await Artist.findById(id);
    if (!artistDB) {
      return next(setError(404, "Artist not found"));
    }
    return res.status(200).json(artistDB);
  } catch (error) {
    return next(setError(500, "Artist server error"));
  }
};

const patchArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchArtist = new Artist(req.body);
    patchArtist._id = id;
    if (req.file) {
      patchArtist.img = req.file.path;
    }
    const artistDB = await Artist.findByIdAndUpdate(id, patchArtist);
    if (!artistDB) {
      return next(setError(404, "Artist not found"));
    }
    if (artistDB.img) deleteFile(artistDB.img);
    return res.status(200).json({ new: patchArtist, old: artistDB });
  } catch (error) {
    return next(setError(500, "Artist Patch server error"));
  }
};

module.exports = {
    postNewArtist,
    getArtist,
    getAllArtist,
    patchArtist,
};
