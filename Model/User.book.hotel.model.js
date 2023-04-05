const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserBookHotel = new Schema({
  address: {
    type: String,
    required: true,
  },
  member: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  coadminid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CoAdminProductAdd",
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Userdetails",
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserBookHotel", UserBookHotel);
