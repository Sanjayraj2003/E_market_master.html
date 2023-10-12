const { Brand } = require("../models/Brand");

exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.fetchBrand = async (req, res) => {
  try {
    const brand = await Brand.find({}).exec();
    res.status(200).json(brand);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
