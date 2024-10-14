const express = require("express");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", authController.register);
router.get("/verify/:token", authController.verifyEmail);
router.post("/login", authController.login);

module.exports = router;
