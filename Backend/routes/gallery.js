var express = require("express");
var router = express.Router();
const {
  createGallery,
  getAllGallery,
  deleteNotice,
  getAGallery,
  updateGallery,
} = require("../controllers/gallery");
router.get("/getAll", getAllGallery);
router.get("/get/:id", getAGallery);

router.post("/create", createGallery);
router.post("/update/:heyid", updateGallery);
router.delete("/delete/:galleryId", deleteNotice);

module.exports = router;
