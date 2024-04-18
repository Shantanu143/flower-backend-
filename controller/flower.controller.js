const asyncHandler = require("express-async-handler");
const Flowers = require("../model/flower.model");
//@desc POST flower
//route /upload-flower
//@access public

const uploadFlower = asyncHandler(async (req, res) => {
  const { flowerTitle, price, imageURL, discount } = req.body;
  if (!flowerTitle || !price || !imageURL || !discount) {
    res.status(400).json({ message: "All fields are mandatory" });
    return; // Exit early
  }
  try {
    const flower = await Flowers.create({
      flowerTitle,
      price,
      imageURL,
      discount,
    });
    res.status(201).json(flower);
  } catch (error) {
    res.status(500).json({ message: "Failed to upload flower", error: error.message });
  }
});
//@dece GET single flowers
//@route /api/flower/:id
//@access public

const getSingleFlower = asyncHandler(async (req, res) => {
  const flower = await Flowers.findById(req.params.id);
  if (!flower) {
    res.status(404);
    throw new Error("flower not found");
  }
  res.status(200).json(flower);
});

//@dece GET all flowers
//@route /all-flower
//@access public

const getAllFlowers = asyncHandler(async (req, res) => {
  console.log(req.body);
  let query = {};
  if (req.query?.category) {
    query = { category: req.query.category };
  }

  const flower = await Flowers.find(query);

  if (!flower) {
    res.status(404);
    throw new Error("flower can't find");
  }
  res.status(200).json(flower);
  res.send(flower);
});

// @dece updateflower
//@route /update-flower/:id
//@access public

const updateFlower = asyncHandler(async (req, res) => {
  console.log(req.body);

  const flower = await Flowers.findById(req.params.id);

  if (!flower) {
    res.status(404);
    throw new Error("flower not found");
  }
  const updatedFlower = await Flowers.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedFlower);
  res.send(updatedFlower);
});

//@dece deleteflower
//@route /delete-flower/:id
//@access public

const deleteFlower = asyncHandler(async (req, res) => {
  console.log(req.body);

  const flower = await Flowers.findById(req.params.id);

  if (!flower) {
    res.status(404);
    throw new Error("flower not found");
  }

  await flower.deleteOne();
  res.status(200).json(flower);
});

module.exports = {
  uploadFlower,
  getSingleFlower,
  getAllFlowers,
  deleteFlower,
  updateFlower,
};
