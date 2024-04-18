const mongoose = require("mongoose");

const flowerSchema = mongoose.Schema({
  flowerTitle: {
    type: String,
    require: [true, "Please enter flower title"],
  },

  imageURL: {
    type: String,
    require: [true, "Please enter img url"],
  },

  price: {
    type: String,
    require: [true, "Please enter flower price"],
  },

  discount: {
    type: String,
    require: [true, "Please enter flower discount"],
  },
});
module.exports = mongoose.model("Flowers", flowerSchema);
