const express = require("express");
const { createUser, loginUser, checkUser } = require("../controllers/Auth");
const passport = require("passport");

const router = express.Router();
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);
exports.router = router;
