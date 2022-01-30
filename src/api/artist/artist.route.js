const ArtistRoutes = require("express").Router();
const { isAuth } = require("../../utils/middleware/auth");
const {
  postNewArtist,
  getArtist,
  getAllArtist,
  patchArtist,
} = require("./artist.controller");
const upload = require("../../utils/middleware/file");

ArtistRoutes.get("/:id", getArtist);
ArtistRoutes.get("/", getAllArtist);
ArtistRoutes.post("/", [isAuth], upload.single("img"), postNewArtist);
ArtistRoutes.patch("/:id", [isAuth], upload.single("img"), patchArtist);

module.exports = ArtistRoutes;
