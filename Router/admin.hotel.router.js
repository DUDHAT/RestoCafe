const express = require("express");

const AdminController = require("../Controller/admin.hotel.controller");

const admin_router = express.Router();

admin_router.post("/SuperAdmin-signup", AdminController.SignUp);
admin_router.post("/SuperAdmin-signin", AdminController.SignIn);
admin_router.post(
  "/SuperAdmin-CreateCo-admin",
  AdminController.coadminregistration
);
admin_router.post("/show-All-book-hotel", AdminController.showAllbookhotel);

module.exports = admin_router;
