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
    return res.send("email is required");
  }

  CoAdminRegistration.find({ email }).then((data) => {
    if (data) {
      //   console.log(data[0].password);
      bcrypt.compare(password, data[0].password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { email: data[0].email, id: data[0]._id },
            "secretOrPrivateKeysecretOrPrivateKey",
            { expiresIn: "1h" }
          );
          res.send({ data: data[0], token: token });
          //   res.send(data);
        } else {
          res.send("err");
        }
      });
    } else {
      res.send("invelid password");
    }
  });
};

//coadmin self information insert
exports.CoAdminInsertDetails = (req, res) => {
  console.log("hello world");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const name = req.body.name;
  const contact = req.body.contact;
  const email = req.body.email;
  const logos = req.files;
  const sit = req.body.sit;
  const ontime = req.body.ontime;
  const offtime = req.body.offtime;
  let logo;
  let pic = [];
  logos.forEach((element) => {
    if (element.fieldname == "logo") {
      logo = element.filename;
    }
    if (element.fieldname == "pic") {
      pic.push(element.filename);
    }
  });
  const data = {
    name: name,
    contact: contact,
    email: email,
    sit: sit,
    ontime: ontime,
    offtime: offtime,
    logo: logo,
    pic: pic,
  };
  CoAdmindetails.create(data).then((data) => {
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
    res.send(data);
  });
};

//coadmin self information edit
exports.CoAdminEditDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.body.id;
  const name = req.body.name;
  const contact = req.body.contact;
  const email = req.body.email;
  const logos = req.files;
  const sit = req.body.sit;
  const ontime = req.body.ontime;
  const offtime = req.body.offtime;
  let logo;

  let pic = [];
  logos.forEach((element) => {
    if (element.fieldname == "logo") {
      logo = element.filename;
    }
    if (element.fieldname == "pic") {
      pic.push(element.filename);
    }
  });

  if (pic == "") {
    await CoAdmindetails.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          contact: contact,
          email: email,
          sit: sit,
          ontime: ontime,
          offtime: offtime,
          logo: logo,
        },
      }
    ).then(async (data) => {
      await CoAdmindetails.findOne({ _id: id }).then((data) => {
        let arr = [];
        const ontimes = parseInt(data.ontime, 10);

        for (let i = ontimes; i <= data.offtime; i++) {
          arr.push({ time: i, sit: data.sit });
        }
        const CoAdmindId = data._id;

        CoAdminTime.updateOne(
          { CoAdmindId: CoAdmindId },
          { $set: { time: arr } }
        ).then((data) => {
          // console.log(data);
        });
      });

      res.send(data);
    });
  } else {
    await CoAdmindetails.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          contact: contact,
          email: email,
          sit: sit,
          ontime: ontime,
          offtime: offtime,
          logo: logo,
          pic: pic,
        },
      }
    ).then(async (data) => {
      await CoAdmindetails.findOne({ _id: id }).then((data) => {
        let arr = [];
        const ontimes = parseInt(data.ontime, 10);

        for (let i = ontimes; i <= data.offtime; i++) {
          arr.push({ time: i, sit: data.sit });
        }
        const CoAdmindId = data._id;

        CoAdminTime.updateOne(
          { CoAdmindId: CoAdmindId },
          { $set: { time: arr } }
        ).then((data) => {
          // console.log(data);
        });
      });
      res.send(data);
    });
  }
};

//coadmin edit sit
exports.CoAdminEditSit = async (req, res) => {
  const coadminId = req.body.coadminId;
  const edittime = req.body.edittime;
  const sit = req.body.sit;
  CoAdminTime.find({ coadminId: coadminId }).then((data) => {
    const Array_obj = data[0].time;
    for (const i of Array_obj) {
      if (i.time == edittime) {
        i.sit = sit;
      }
    }
    CoAdminTime.updateOne(
      { coadminId: coadminId },
      { $set: { time: Array_obj } }
    ).then((data) => {
      // console.log(data);
    });
    res.send(data);
  });
};

exports.coAdminShowSit = async (req, res) => {
  const coadminId = req.body.coadminId;
  CoAdminTime.find({ coadminId: coadminId }).then((data) => {
    res.send(data);
  });
};
