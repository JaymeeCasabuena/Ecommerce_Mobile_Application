const User = require("../models/user");

exports.addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push(address);
    await user.save();
    res.status(200).json({ message: "Address added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding address", error: err });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving addresses", error: err });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const userProfile = {
      fullName: user.name,
      email: user.email,
      password: user.password,
    };
    res.status(200).json({ userProfile });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user profile", error: err });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId, name, password } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    user.password = password;
    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err });
  }
};
