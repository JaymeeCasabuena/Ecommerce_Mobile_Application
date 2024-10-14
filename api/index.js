const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 8000;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
