const express = require("express");
const { body, validationResult } = require("express-validator");

const coAdminController = require("../Controller/co-admin.hotel.controller");

const coadmin_router = express.Router();

coadmin_router.post("/Co-Admin-signin", coAdminController.CoAdminSignin);

coadmin_router.post(
  "/Co-admin-details-insert",
  [
    body("name", "name is required").trim().isLength({ min: 1 }),
    body("contact", "contact is required")
      .trim()
      .isLength({ min: 10, max: 10 }),
    body("email", "Email is required").isEmail(),
  ],
  coAdminController.CoAdminInsertDetails
);

coadmin_router.post(
  "/Co-admin-details-edit",
  [
    body("name", "name is required").trim().isLength({ min: 1 }),
    body("contact", "contact is required")
      .trim()
      .isLength({ min: 10, max: 10 }),
    body("email", "Email is required").isEmail(),
    body("logo", "logo is required"),
    body("pic", "pic is required"),
  ],
  coAdminController.CoAdminEditDetails
);

coadmin_router.post("/Co-admin-edit-sit", coAdminController.CoAdminEditSit);

coadmin_router.post("/co-Admin-Show-Sit", coAdminController.coAdminShowSit);
module.exports = coadmin_router;
