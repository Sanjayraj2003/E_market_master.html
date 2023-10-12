const { Order } = require("../models/Order");

exports.fetchOrderByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.createOrder = async (req, res) => {
  const { id } = req.user;
  const order = new Order({ ...req.body, user: id });
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({ deleted: { $ne: true } });
  let totalOrderQuery = Order.find({ deleted: { $ne: true } });

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalOrderQuery = totalOrderQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  const totalDocs = await totalOrderQuery.count().exec();
  console.log({ totalDocs });
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
