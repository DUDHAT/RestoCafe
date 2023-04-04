const express = require("express");
const { body, validationResult } = require("express-validator");

const UserController = require("../Controller/user.hotel.controller");
const User_router = express.Router();

User_router.post(
  "/User-signup",
  [
    body("name", "name is required").trim().isLength({ min: 1 }),
    body("contact", "contact is required")
      .trim()
      .isLength({ min: 10, max: 10 }),
    body("email", "Email is required").isEmail(),
    body("password", "logo is required").trim(),
    body("address", "pic is required").trim(),
  ],
  UserController.UserRegistration
);

User_router.post(
  "/User-signin",
  [
    body("email", "Email is required").isEmail(),
    body("password", "logo is required").trim(),
  ],
  UserController.UserLogin
);
User_router.post(
  "/User-Foeget-Password",
  [
    body("email", "Email is required").isEmail().isLength({ min: 1 }),
    body("password", "password is required").trim().isLength({ min: 1 }),
  ],
  UserController.UserFoegetPassword
);

User_router.post("/User-book-Hotel", UserController.UserbookHotel);

User_router.post("/User-edit-book-Hotel", UserController.UserEditbookHotel);
User_router.post("/User-find-All-hotel", UserController.UserfindAllhotel);
User_router.get("/User-get-book-hotel", UserController.Usergetbookhotel);

module.exports = User_router;
