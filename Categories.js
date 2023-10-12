const express = require("express");
const { createCategory, fetchCategory } = require("../controllers/Category");

const router = express.Router();
router.post("/", createCategory).get("/", fetchCategory);
exports.router = router;
