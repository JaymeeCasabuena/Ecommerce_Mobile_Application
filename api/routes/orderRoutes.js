const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("/user/:userId", orderController.getOrders);
router.put("/update", orderController.updateOrderStatus);

module.exports = router;
