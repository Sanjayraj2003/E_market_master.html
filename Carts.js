const express = require("express");
const {
  updateCart,
  deleteFromCart,
  fetchCartByUser,
  addToCart,
} = require("../controllers/Cart");
const router = express.Router();
router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .delete("/:id", deleteFromCart)
  .patch("/:id", updateCart);
exports.router = router;
