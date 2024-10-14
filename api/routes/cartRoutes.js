const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/:userId", cartController.getCart);
router.put("/update", cartController.updateCart);

module.exports = router;
