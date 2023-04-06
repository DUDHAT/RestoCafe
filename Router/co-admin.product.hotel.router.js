const express = require("express");
const { body, validationResult } = require("express-validator");

const coAdminProductController = require("../Controller/co-admin.product.hotel.controller");

const coadminProduct_router = express.Router();

coadminProduct_router.post(
  "/Co-Admin-add-product",
  [
    body("name", "name is required").trim().isLength({ min: 1 }),
    body("details", "details is required").trim(),
    body("pic", "pic is required").trim(),
    body("rating", "rating is required").trim(),
    body("price", "price is required").trim(),
    body("category", "category is required").trim(),
    body("description", "description is required").trim(),
    body("address", "address is required").trim(),
  ],
  coAdminProductController.coadminproductadd
);

coadminProduct_router.post(
  "/Co-Admin-edit-product",
  [
    body("name", "name is required").trim().isLength({ min: 1 }),
    body("details", "details is required").trim(),
    body("pic", "pic is required").trim(),
    body("rating", "rating is required").trim(),
    body("price", "price is required").trim(),
    body("category", "category is required").trim(),
    body("description", "description is required").trim(),
    body("address", "address is required").trim(),
  ],
  coAdminProductController.coadminproductedit
);

coadminProduct_router.delete(
  "/Co-Admin-delete-product",
  [
    body("id", "id is required").trim(),
    body("CoAdmindId", "CoAdmindId is required").trim(),
  ],
  coAdminProductController.coadminproductdelete
);
coadminProduct_router.get(
  "/Co-Admin-find-product",
  [body("CoAdmindId", "CoAdmindId is required").trim()],
  coAdminProductController.coadminproductget
);

coadminProduct_router.get(
  "/show-Prodect",
  coAdminProductController.showProdect
);

module.exports = coadminProduct_router;
