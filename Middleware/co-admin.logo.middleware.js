const path = require("path");
const multer = require("multer");
const sanitize = require("sanitize-filename");
// require("../image")
const uploadFolderPath = path.resolve(__dirname, "../image");
// console.log("hello+",path.resolve(__dirname, "../image"))

exports.fileStorege = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolderPath);
  },
  filename: (req, file, cb) => {
    cb(null, sanitize(new Date().toISOString() + "-" + file.originalname));
  },
});

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    console.log("5");
  }
};
