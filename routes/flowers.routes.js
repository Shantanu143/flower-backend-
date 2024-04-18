const express = require("express");
const {
  getAllFlowers,
  updateFlower,
  getSingleFlower,
  deleteFlower,
  uploadFlower,
} = require("../controller/flower.controller");

const router = express.Router();

//router.route("/all-books");
router.route("/").get(getAllFlowers).post(uploadFlower);


//router.route("/delete-book/:id");
router
  .route("/:id")
  .get(getSingleFlower)
  .put(updateFlower)
  .delete(deleteFlower);

module.exports = router;
