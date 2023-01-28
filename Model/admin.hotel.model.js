const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuperAdminModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Adminpanelhotel", SuperAdminModel);
