const { Category } = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const doc = await category.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.fetchCategory = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
