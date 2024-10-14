const User = require("../models/user");

exports.updateCart = async (req, res) => {
  try {
    const { userId, totalPrice, totalItems, cartProducts } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart.totalPrice = totalPrice;
    user.cart.totalItems = totalItems;
    user.cart.products = cartProducts;
    await user.save();

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating cart", error: err });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving cart", error: err });
  }
};
