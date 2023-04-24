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
          res.send({ data, response: "success" });
        });
      });
    } else {
      res.send({ response: "email already exists", data: {} });
    }
  });
};

exports.UserLogin = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    const password = req.body.password;
    Userdetails.find({ email }).then((data) => {
      // console.log("+++++++++++*******++++", data[0].email);
      console.log("++**********", data[0]);
      if (data[0] != undefined) {
        const token = jwt.sign(
          { email: data.email, id: data._id },
          "secretOrPrivateKeysecretOrPrivateKey",
          { expiresIn: "1h" }
        );
        bcrypt.compare(password, data[0].password, (err, isMatch) => {
          if (isMatch) {
            res.send({ data: data[0], response: "success" });
          } else {
            res.send({ response: "invelid password", data: {} });
          }
        });
      } else {
        res.send({ response: "user not found" });
      }
    });
  } catch (error) {
    res.send({ response: "user not found" });
  }
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
    // const ProductId = req.body.ProductId;
    const UserId = req.body.UserId;
    const arr = [];
    const dateTime = new Date();
    const Time = dateTime;
    const coadminid = req.body.CoAdmindId;
    if (coadminid == "") {
      return res.send({
        data: "pls enter CoAdmindId",
        status: false,
        responsecode: 0,
      });
    }
    console.log("hello");
    // CoAdminProductAdd.find({ _id: ProductId }).then((data) => {

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
          { CoAdmindId: coadminid },
          { $set: { time: Array_obj } }
        ).then((data) => {
          // console.log(data);
          // res.send(data);
        });
        UserBookHotel.create({
          address,
          member,
          time,
          coadminid: coadminid,
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
    // });
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
    const coadminid = req.body.CoAdmindId;
    // if (ProductId == "") {
    //   return res.send({
    //     data: "pls enter ProductId",
    //     status: false,
    //     responsecode: 0,
    //   });
    // }
    // const a = UserBookHotel.findOne({ _id: userbookhotelId }).then((data) => {
    //   console.log(data);
    // });
    // console.log("aaaaaaaaaaaaaa", a);
    // console.log("hello");
    // CoAdminProductAdd.find({ _id: ProductId }).then((data) => {
    //   if (data == "") {
    //     return res.send({
    //       data: "product not found",
    //       status: false,
    //       responsecode: 0,
    //     });
    //   }
    //   const coadminid = data[0].CoAdmindId;
    // console.log(coadminid);

    await CoAdminTime.find({ CoAdmindId: coadminid }).then(async (data) => {
      console.log("++++--------------", data);
      if (data == "") {
        return res.send({
          data: "coadmin not found",
          status: false,
          responsecode: 0,
        });
      }
      const Array_obj = data[0].time;
      const arrewe = [];
      await UserBookHotel.findOne({ _id: userbookhotelId }).then((data) => {
        console.log({ "+++++++++++++++++++++++++++++++++++++++++/*": data });
        arrewe.push(data);
      });
      console.log("*********", arrewe);
      const arraya = arrewe[0].member;
      if (arraya == member) {
        console.log("if");
        UserBookHotel.updateOne(
          { _id: userbookhotelId },
          {
            $set: {
              address,
              member,
              time,
              coadminid: coadminid,
              UserId,
              Time,
            },
          }
        ).then((data) => {
          return res.send({ data: data, response: "success" });
        });
      } else if (arraya < member) {
        console.log("else if");
        const a = member - arraya;
        for (const i of Array_obj) {
          if (i.time == time) {
            // console.log(i.sit + member);
            i.sit = i.sit + a;
          }
        }
        // console.log(Array_obj);
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
            { CoAdmindId: coadminid },
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
                coadminid: coadminid,
                UserId,
                Time,
              },
            }
          ).then((data) => {
            return res.send({ data: data, response: "success" });
          });
        }
      } else {
        console.log("else");
        const aa = arraya - member;
        for (const i of Array_obj) {
          if (i.time == time) {
            // console.log(i.sit + member);
            i.sit = i.sit - aa;
          }
        }
        console.log(Array_obj);
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
            { CoAdmindId: coadminid },
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
                coadminid: coadminid,
                UserId,
                Time,
              },
            }
          ).then((data) => {
            return res.send({ data: data, response: "success" });
          });
        }
      }
    });
    // });
    // }
  } catch (error) {
    console.log(error);
  }
};

exports.Usergetbookhotel = async (req, res) => {
  const id = req.query.id;
  if (id == "") {
    return res.send({
      data: "id not found",
      status: false,
      responsecode: 0,
    });
  }
  UserBookHotel.find({ UserId: id }).then((data) => {
    res.send({ data: data, response: "success" });
  });
};

exports.UserDeleteHotel = async (req, res) => {
  try {
    // console.log(req.body);
    // const UserId = req.body.UserId;
    const userbookhotelId = req.query.userbookhotelId;
    const arr = [];
    const dateTime = new Date();
    const Time = dateTime;

    const a = UserBookHotel.findOne({ _id: userbookhotelId }).then((data) => {
      console.log(data);
      if (data == null) {
        return res.send({
          data: "coadmin not found",
          status: false,
          responsecode: 0,
        });
      } else {
        const coadminid = data.coadminid;
        const time = data.time;
        const member = data.member;
        console.log(member);
        // console.log(coadminid);
        CoAdminTime.find({ CoAdmindId: coadminid }).then((data) => {
          // console.log(data[0].time);
          const Array_obj = data[0].time;
          for (const i of Array_obj) {
            if (i.time == time) {
              // console.log(i.sit + member);
              i.sit = parseInt(i.sit) + member;
            }
          }
          console.log(Array_obj);
          CoAdminTime.updateOne(
            { CoAdmindId: coadminid },
            { $set: { time: Array_obj } }
          ).then((data) => {
            // console.log(data);
            // res.send(data);
          });
          UserBookHotel.deleteOne({ _id: userbookhotelId }).then((data) => {
            // console.log(data);
            res.send({ data: data, response: "success" });
          });
        });

        // res.send(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
