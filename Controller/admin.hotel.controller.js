const bcrypt = require("bcryptjs");
const saltRounds = 10;

const SuperAdminModel = require("../Model/admin.hotel.model");
const CoAdminRegistration = require("../Model/co-admin.hotel.model");
const UserBookHotel = require("../Model/User.book.hotel.model");
const CoAdmindetails = require("../Model/co-admindetails.hotel.model");

exports.SignUp = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  SuperAdminModel.create({ email: email, password: password }).then((data) => {
    res.send({ data: data, response: "success" });
  });
};

exports.SignIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email && !password) {
    return res.send("email and password is required");
  }
  if (!email) {
    return res.send("email is required");
  }
  if (!password) {
    return res.send("email is required");
  }

  SuperAdminModel.findOne({ email: email }).then((data) => {
    if (data) {
      SuperAdminModel.findOne({ email: email, password: password }).then(
        (data) => {
          if (data) {
            res.send({ data: data, response: "success" });
          } else {
            res.send("invelid password");
          }
        }
      );
    } else {
      res.send("username invelid");
    }
  });
};

exports.coadminregistration = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email && !password) {
    return res.send({ message: "email and password is required" });
  }
  if (!email) {
    return res.send({ message: "email is required" });
  }
  if (!password) {
    return res.send({ message: "email is required" });
  }
  const hpassword = bcrypt.hash(password, saltRounds).then((hash) => {
    CoAdminRegistration.find({ email: email }).then((data) => {
      if (data == "") {
        CoAdminRegistration.create({ email: email, password: hash }).then(
          (data) => {
            res.send({ data: data, status: 200 });
          }
        );
      } else {
        return res.send({ message: "email already exists" });
      }
    });
  });
};

exports.showAllbookhotel = (req, res) => {
  UserBookHotel.find().then((data) => {
    res.send({ data: data });
  });
};

exports.showAllCoadmin = (req, res) => {
  const arr = [];
  CoAdmindetails.find().then((data) => {
    console.log(data[0]);

    res.send(data);
  });
};
