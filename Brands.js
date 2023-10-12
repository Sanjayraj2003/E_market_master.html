const express = require("express");
const { createBrand, fetchBrand } = require("../controllers/Brand");
const router = express.Router();
router.post("/", createBrand).get("/", fetchBrand);
exports.router = router;
