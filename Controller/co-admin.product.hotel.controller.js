const CoAdminProductAdd = require("../Model/co-admin.product.hotel.model");
const { body, validationResult } = require("express-validator");

exports.coadminproductadd = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const name = req.body.name;
  const details = req.body.details;
  const rating = req.body.rating;
  const price = req.body.price;
  const category = req.body.category;
  let pic = [req.body.pic];
  // pic = req.body.pic;
  // console.log(pic[0]);
  const lo = pic[0];
  console.log(lo);
  const a = lo.slice(1, -2);
  // const b = a.replaceAll(',\"https', ',"https');
  // // var str1 = "a\d\k";
  // var aw = a.replace(/\\/g, "");

  // // console.log(b);
  console.log(a);
  const CoAdmindId = req.body.CoAdmindId;
  // console.log(CoAdmindId, "CoAdmindId");
  const data = {
    name: name,
    details: details,
    rating: rating,
    price: price,
    category: category,
    pic: a,
    CoAdmindId: CoAdmindId,
  };
  // console.log(data);
  CoAdminProductAdd.create(data).then((data) => {
    // console.log(data);
    res.send({ data, response: "success" });
  });
};

exports.coadminproductedit = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.body.id;
  const name = req.body.name;
  const details = req.body.details;
  const rating = req.body.rating;
  const price = req.body.price;
  const category = req.body.category;
  let pic = [req.body.pic];
  const lo = pic[0];
  console.log(lo);
  const a = lo.slice(1, -2);
  console.log(a);
  const CoAdmindId = req.body.CoAdmindId;
  CoAdminProductAdd.updateOne(
    { _id: id, CoAdmindId: CoAdmindId },
    {
      $set: {
        name: name,
        details: details,
        rating: rating,
        price: price,
        category: category,
        pic: a,
      },
    }
  ).then((data) => {
    res.send({ data, response: "success" });
  });
};

exports.coadminproductdelete = (req, res) => {
  const id = req.body.id;
  const CoAdmindId = req.body.CoAdmindId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // if (id == "") {
  //   return res.send({ message: "id is required" });
  // }
  // if (CoAdmindId == "") {
  //   return res.send({ message: "CoAdmindId is required" });
  // }
  CoAdminProductAdd.deleteOne({ _id: id, CoAdmindId: CoAdmindId })
    .then((data) => {
      res.send({ data: data, response: "success" });
    })
    .catch((e) => res.send(e));
};

exports.coadminproductget = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const CoAdmindId = req.query.CoAdmindId;
  // console.log(CoAdmindId);
  if (CoAdmindId == "") {
    res.send({ message: "CoAdmin Id is required" });
  }
  CoAdminProductAdd.find({ CoAdmindId: CoAdmindId }).then((data) => {
    res.send({ data: data, response: "success" });
  });
};

exports.showProdect = (req, res) => {
  CoAdminProductAdd.find().then((data) => {
    res.send({ data: data, response: "success" });
  });
};
