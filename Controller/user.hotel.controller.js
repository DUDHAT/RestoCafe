const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const Userdetails = require("../Model/user.hotel.model");
const CoAdminProductAdd = require("../Model/co-admin.product.hotel.model");
const UserBookHotel = require("../Model/User.book.hotel.model");
const CoAdminTime = require("../Model/co-admin.time.hotel.model");
const { body, validationResult } = require("express-validator");
const CoAdminRegistration = require("../Model/co-admin.hotel.model");
const CoAdmindetails = require("../Model/co-admindetails.hotel.model");

exports.UserRegistration = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const name = req.body.name;
  const contact = req.body.contact;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;

  Userdetails.find({ email }).then((data) => {
    if (data == "") {
      const hpassword = bcrypt.hash(password, saltRounds).then((hash) => {
        Userdetails.create({
          name,
          email,
          contact,
          password: hash,
          address,
        }).then((data) => {
          res.send(data);
        });
      });
    } else {
      res.send({ message: "email already exists" });
    }
  });
};

exports.UserLogin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.body.email;
  const password = req.body.password;
  Userdetails.find({ email }).then((data) => {
    if (data) {
      const token = jwt.sign(
        { email: data.email, id: data._id },
        "secretOrPrivateKeysecretOrPrivateKey",
        { expiresIn: "1h" }
      );
      bcrypt.compare(password, data[0].password, (err, isMatch) => {
        if (isMatch) {
          res.send({ data: data, token: token, response: "success" });
        } else {
          res.send({ message: "invelid password" });
        }
      });
    } else {
      res.send({ message: "user not found" });
    }
  });
};

exports.UserFoegetPassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.body.email;
  const password = req.body.password;

  Userdetails.find({ email }).then((data) => {
    if (data == "") {
      res.send({ message: "invelid email" });
    } else {
      const hpassword = bcrypt.hash(password, saltRounds).then((hash) => {
        Userdetails.updateOne({ email }, { $set: { password: hash } }).then(
          (data) => {
            // console.log(data);
            if (data.acknowledged == true) {
              Userdetails.find({ email }).then((data) => {
                res.send({ data: data, response: "success" });
              });
            } else {
              res.send("pls enter valid password");
            }
          }
        );
      });
    }
  });
};

exports.UserfindAllhotel = (req, res) => {
  CoAdmindetails.find().then((data) => {
    res.send({ data });
    // console.log(data[0]);
  });
};

exports.UserbookHotel = async (req, res) => {
  try {
    // console.log(req.body);
    const address = req.body.address;
    const member = req.body.member;
    const time = req.body.time;
    const ProductId = req.body.ProductId;
    const UserId = req.body.UserId;
    const arr = [];
    const dateTime = new Date();
    const Time = dateTime;
    if (ProductId == "") {
      return res.send({
        data: "pls enter ProductId",
        status: false,
        responsecode: 0,
      });
    }
    console.log("hello");
    CoAdminProductAdd.find({ _id: ProductId }).then((data) => {
      if (data == "") {
        return res.send({
          data: "product not found",
          status: false,
          responsecode: 0,
        });
      }
      const coadminid = data[0].CoAdmindId;
      // console.log(coadminid);

      CoAdminTime.find({ CoAdmindId: coadminid }).then((data) => {
        // console.log(data);
        if (data == "") {
          return res.send({
            data: "coadmin not found",
            status: false,
            responsecode: 0,
          });
        }
        const Array_obj = data[0].time;
        for (const i of Array_obj) {
          if (i.time == time) {
            i.sit = i.sit - member;
          }
        }
        Array_obj.forEach((Element) => {
          // console.log(Element);
          if (Element.sit < 0) {
            arr.push("hello");
            return res.send("hotel is full");
          }
        });
        if (arr == "") {
          // console.log(Array_obj);
          CoAdminTime.updateOne(
            { coadminid: coadminid },
            { $set: { time: Array_obj } }
          ).then((data) => {
            // console.log(data);
            // res.send(data);
          });
          UserBookHotel.create({
            address,
            member,
            time,
            ProductId,
            UserId,
            Time,
          }).then((data) => {
            // console.log(data);
            res.send({ data: data, response: "success" });
          });
        } else {
          // console.log("hotel full");
        }
      });
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

exports.UserEditbookHotel = async (req, res) => {
  try {
    // console.log(req.body);
    const address = req.body.address;
    const member = req.body.member;
    const time = req.body.time;
    const ProductId = req.body.ProductId;
    const UserId = req.body.UserId;
    const userbookhotelId = req.body.userbookhotelId;
    const arr = [];
    const dateTime = new Date();
    const Time = dateTime;
    if (ProductId == "") {
      return res.send({
        data: "pls enter ProductId",
        status: false,
        responsecode: 0,
      });
    }
    console.log("hello");
    CoAdminProductAdd.find({ _id: ProductId }).then((data) => {
      if (data == "") {
        return res.send({
          data: "product not found",
          status: false,
          responsecode: 0,
        });
      }
      const coadminid = data[0].CoAdmindId;
      // console.log(coadminid);

      CoAdminTime.find({ CoAdmindId: coadminid }).then((data) => {
        // console.log(data);
        if (data == "") {
          return res.send({
            data: "coadmin not found",
            status: false,
            responsecode: 0,
          });
        }
        const Array_obj = data[0].time;
        for (const i of Array_obj) {
          if (i.time == time) {
            i.sit = i.sit + member;
          }
        }
        Array_obj.forEach((Element) => {
          // console.log(Element);
          if (Element.sit < 0) {
            arr.push("hello");
            return res.send("hotel is full");
          }
        });
        if (arr == "") {
          // console.log(Array_obj);
          CoAdminTime.updateOne(
            { coadminid: coadminid },
            { $set: { time: Array_obj } }
          ).then((data) => {
            // console.log(data);
            // res.send(data);
          });
          UserBookHotel.updateOne(
            { _id: userbookhotelId },
            {
              $set: {
                address,
                member,
                time,
                ProductId,
                UserId,
                Time,
              },
            }
          ).then((data) => {
            res.send({ data: data, response: "success" });
          });
        } else {
          // console.log("hotel full");
        }
      });
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

exports.Usergetbookhotel = async (req, res) => {
  const id = req.body.id;
  if (id == "") {
    return res.send({
      data: "id not found",
      status: false,
      responsecode: 0,
    });
  }
  UserBookHotel.find({ _id: id }).then((data) => {
    res.send(data);
  });
};
