const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoAdminProductAdd = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  details: {
    type: String,
    required: true,
  },
  pic: {
    type: Array,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  CoAdmindId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CoAdmindetails",
    required: true,
  },
});

module.exports = mongoose.model("CoAdminProductAdd", CoAdminProductAdd);
