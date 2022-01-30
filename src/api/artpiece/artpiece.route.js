const ArtPieceRoutes = require("express").Router();
const { isAuth } = require("../../utils/middleware/auth");
const {
  postNewArtpiece,
  getArtpiece,
  getAllArtpiece,
  patchArtpiece,
} = require("./artpiece.controller");
const upload = require("../../utils/middleware/file");

ArtPieceRoutes.get("/:id", getArtpiece);
ArtPieceRoutes.get("/", getAllArtpiece);
ArtPieceRoutes.post("/", [isAuth], upload.single("img"), postNewArtpiece);
ArtPieceRoutes.patch("/:id", [isAuth], upload.single("img"), patchArtpiece);

module.exports = ArtPieceRoutes;
