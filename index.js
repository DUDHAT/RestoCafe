const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const connection = require("./DB_Connection/DB.Connection");
const adminRouter = require("./Router/admin.hotel.router");
const coadmin_router = require("./Router/co-admin.hotel.router");
const coadminProduct_router = require("./Router/co-admin.product.hotel.router");
const User_router = require("./Router/user.hotel.router");
// const fileStorege = require("./Middleware/co-admin.logo.middleware");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(`${__dirname}/image`));
// app.use(
//   multer({
//     fileFilter: fileStorege.fileFilter,
//     storage: fileStorege.fileStorege,
//   }).any("image")
// );
app.use(adminRouter);
app.use(coadmin_router);
app.use(coadminProduct_router);
app.use(User_router);

app.get("/", (req, res) => {
  res.send("hello every one");
});

app.listen(5151, () => {
  console.log("server is runing " + 5151);
});
