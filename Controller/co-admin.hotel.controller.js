const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const saltRounds = 10;

const CoAdminRegistration = require("../Model/co-admin.hotel.model");
const CoAdmindetails = require("../Model/co-admindetails.hotel.model");
const CoAdminTime = require("../Model/co-admin.time.hotel.model");

//coadmin  login
exports.CoAdminSignin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email && !password) {
    return res.send("email and password is required");
  }
  if (!email) {
    return res.send("email is required");
  }
  if (!password) {
    return res.send("password is required");
  }

  CoAdminRegistration.find({ email }).then((data) => {
    // console.log(data[0] != undefined);
    if (data[0] != undefined) {
      //   console.log(data[0].password);
      bcrypt.compare(password, data[0].password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { email: data[0].email, id: data[0]._id },
            "secretOrPrivateKeysecretOrPrivateKey",
            { expiresIn: "1h" }
          );
          res.send({ data: data[0], response: "success" });
          //   res.send(data);
        } else {
          res.send({ response: "invelid password", data: {} });
        }
      });
    } else {
      res.send({ response: "user not found" });
    }
  });
};

//coadmin self information insert
exports.CoAdminInsertDetails = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log("++++++++++++++-", req.body);
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const sit = req.body.sit;
    const ontime = req.body.ontime;
    const offtime = req.body.offtime;
    const description = req.body.description;
    const address = req.body.address;
    const CoAdmindId = req.body.CoAdmindId;
    let logo = req.body.logo;
    let pic = [];
    pic = req.body.pic;
    // console.log("pic================", pic);
    const lo = pic[0];
    // console.log("lllloo", pic[0]);
    const a = pic.slice(1, -1);
    // console.log(a);
    // let pic = [];
    // pic = req.body.pic;
    CoAdmindetails.find({ CoAdmindId }).then((data) => {
      // console.log(data);
      if (data == "") {
        console.log("+++++++++++++++++++++");

        const dataa = {
          name: name,
          contact: contact,
          email: email,
          sit: sit,
          address,
          description,
          ontime: ontime,
          offtime: offtime,
          logo: logo,
          pic: a,
          CoAdmindId,
        };
        CoAdmindetails.create(dataa).then((data) => {
          let arr = [];
          for (let i = data.ontime; i <= data.offtime; i++) {
            arr.push({ time: i, sit: data.sit });
          }
          const CoAdmindId = data._id;
          const dummy = {
            time: arr,
            CoAdmindId: CoAdmindId,
          };
          CoAdminTime.create(dummy).then((data) => {
            // console.log(data);
          });
          res.send({ data: data, response: "success" });
        });
      } else {
        console.log("-----------------------");
        console.log("-----------------------");
        return res.send({
          data: data,
          status: false,
          responsecode: 0,
        });
      }
    });
    // console.log("a--------------------", a);
  } catch (error) {
    res.send(error);
  }
};

//coadmin self information edit
exports.CoAdminEditDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name;
  const contact = req.body.contact;
  const email = req.body.email;
  const sit = req.body.sit;
  const ontime = req.body.ontime;
  const description = req.body.description;
  const address = req.body.address;
  const offtime = req.body.offtime;
  let logo = req.body.logo;

  let pic = req.body.pic;
  const lo = pic[0];
  const a = pic.slice(1, -2);
  if (id == "") {
    return res.send({
      data: "coadmin not found",
      status: false,
      responsecode: 0,
    });
  }

  await CoAdmindetails.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        contact: contact,
        email: email,
        sit: sit,
        description,
        address,
        ontime: ontime,
        offtime: offtime,
        logo: logo,
        pic: a,
      },
    }
  ).then(async (data) => {
    await CoAdmindetails.findOne({ _id: id }).then((data) => {
      // console.log(data);
      if (data == null) {
        return;
      }

      let arr = [];
      const ontimes = parseInt(data.ontime, 10);

      for (let i = ontimes; i <= data.offtime; i++) {
        arr.push({ time: i, sit: data.sit });
      }
      const CoAdmindId = data._id;
      console.log("+++++++++------------", CoAdmindId);

      CoAdminTime.updateOne(
        { CoAdmindId: CoAdmindId },
        { $set: { time: arr } }
      ).then((data) => {
        // console.log(data);
      });
    });
    CoAdmindetails.find({ _id: id }).then((data) => {
      res.send({ data: data, response: "success" });
    });
  });
};

//coadmin edit sit
exports.CoAdminEditSit = async (req, res) => {
  const coadminId = req.body.coadminId;
  const edittime = req.body.edittime;
  const sit = req.body.sit;
  CoAdminTime.find({ CoAdmindId: coadminId })
    .then((data) => {
      const Array_obj = data[0].time;
      for (const i of Array_obj) {
        if (i.time == edittime) {
          i.sit = sit;
        }
      }
      CoAdminTime.updateOne(
        { CoAdmindId: coadminId },
        { $set: { time: Array_obj } }
      ).then((data) => {
        res.send({ data: data, response: "success" });
      });
      // res.send({ data: arr, data, arr2, response: "success" });
    })
    .catch((err) => {
      res.send({ message: "coadmin not found" });
    });
};

exports.coAdminShowSit = async (req, res) => {
  const coadminId = req.body.coadminId;
  console.log(req.body);
  console.log(coadminId);
  let arr = [];
  CoAdminTime.find().then((data) => {
    console.log(data);
  });
  // console.log(coadminId);
  CoAdminTime.find({ CoAdmindId: coadminId })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        // console.log(coadminId == element.CoAdmindId);
        if (coadminId != element.CoAdmindId) {
        } else {
          arr.push(element);
          // res.send({ data: element, response: "success" });
        }
      });
      // console.log(arr);
      res.send({ data: arr, response: "success" });
      // res.end();
    })
    .catch((err) => {
      res.send({ response: "faill" });
    });
};

exports.edittime = async (req, res) => {
  CoAdminTime.find().then((data) => {
    data.forEach((element) => {
      const aa = element;
      const coadminid = element.CoAdmindId;
      CoAdmindetails.find(data[0].CoAdmindId).then((data) => {
        a = data[0].sit;
        const Array_obj = aa.time;
        for (const i of Array_obj) {
          i.sit = a;
        }
        CoAdminTime.updateOne(
          { coadminid: coadminid },
          { $set: { time: Array_obj } }
        ).then((data) => {});
      });
    });

    res.send(data);
  });
};
