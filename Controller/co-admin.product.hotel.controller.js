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
  const pic = [];
  const pics = req.files;
  const CoAdmindId = req.body.CoAdmindId;
  pics.forEach((element) => {
    pic.push(element.filename);
  });
  const data = {
    name: name,
    details: details,
    rating: rating,
    price: price,
    category: category,
    pic: pic,
    CoAdmindId: CoAdmindId,
  };
  CoAdminProductAdd.create(data).then((data) => {
    res.send(data);
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
  const pic = [];
  const pics = req.files;
  const CoAdmindId = req.body.CoAdmindId;
  pics.forEach((element) => {
    pic.push(element.filename);
  });

  if (pic == "") {
    CoAdminProductAdd.updateOne(
      { _id: id, CoAdmindId: CoAdmindId },
      {
        $set: {
          name: name,
          details: details,
          rating: rating,
          price: price,
          category: category,
        },
      }
    ).then((data) => {
      res.send(data);
    });
  } else {
    CoAdminProductAdd.updateOne(
      { _id: id, CoAdmindId: CoAdmindId },
      {
        $set: {
          name: name,
          details: details,
          rating: rating,
          price: price,
          category: category,
          pic: pic,
        },
      }
    ).then((data) => {
      res.send(data);
    });
  }
};

exports.coadminproductdelete = (req, res) => {
  const id = req.body.id;
  const CoAdmindId = req.body.CoAdmindId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (id == "") {
    return res.send({ message: "id is required" });
  }
  if (CoAdmindId == "") {
    return res.send({ message: "CoAdmindId is required" });
  }
  CoAdminProductAdd.deleteOne({ _id: id, CoAdmindId: CoAdmindId }).then(
    (data) => {
      res.send(data);
    }
  );
};

exports.coadminproductget = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const CoAdmindId = req.body.CoAdmindId;
  if (CoAdmindId == "") {
    res.send({ message: "CoAdmin Id is required" });
  }
  CoAdminProductAdd.find({ CoAdmindId: CoAdmindId }).then((data) => {
    res.send({ data: data });
  });
};
