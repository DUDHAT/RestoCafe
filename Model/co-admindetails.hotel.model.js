const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoAdmindetails = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sit: {
    type: String,
    required: true,
  },
  ontime: {
    type: String,
    required: true,
  },
  offtime: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  pic: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("CoAdmindetails", CoAdmindetails);
