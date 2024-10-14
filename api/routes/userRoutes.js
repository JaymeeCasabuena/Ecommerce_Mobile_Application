const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/addresses/:userId", userController.getAddresses);
router.post("/address", userController.addAddress);
router.get("/profile/:userId", userController.getProfile);
router.put("/updateProfile", userController.updateProfile);

module.exports = router;
