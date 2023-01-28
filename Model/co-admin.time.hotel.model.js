const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoAdminTime = new Schema({
  time: {
    type: Array,
    required: true,
  },
  CoAdmindId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CoAdmindetails",
    required: true,
  },
});

module.exports = mongoose.model("CoAdminTime", CoAdminTime);
