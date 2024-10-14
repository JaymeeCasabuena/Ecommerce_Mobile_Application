const Order = require("../models/order");
const User = require("../models/user");

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      totalPrice,
      status,
      shippingAddress,
      paymentMethod,
    } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const products = cartItems.map((item) => ({
      name: item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    const order = new Order({
      user: userId,
      products,
      totalPrice,
      status,
      shippingAddress,
      paymentMethod,
    });
    await order.save();

    res.status(200).json({ message: "Order created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("user");
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving orders", error: err });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const order = await Order.findById(_id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating order status", error: err });
  }
};
