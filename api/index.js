const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://jaymeecasabuena:Jdg091098@cluster0.xnwrby1.mongodb.net/",
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fakestoregu@gmail.com",
      pass: "iyqm obhn utmt dzjd",
    },
  });
  const mailOptions = {
    from: "fakestore.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error sending verification email");
  }
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (err) {
    console.log("error registering user", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email Verification Success" });
  } catch (err) {
    res.status(500).json({ message: "Email Verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login Failed" });
  }
});

app.post("/addresses", async (req, res) => {
  try {
    const {userId, address} = req.body;

    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.addresses.push(address);
    await user.save()

    res.status(200).json({ message: "Address added successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error adding address" });
  }
});

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const addresses = user.addresses;
    res.status(200).json({addresses});
  }
  catch {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
})


app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, status, shippingAddress, paymentMethod } = req.body;

    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const products = cartItems.map((item) => (
      {
        name: item?.title,
        quantity: item?.quantity,
        price: item?.price,
        image: item?.image,
      }
    ))

    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      status: status,
      paymentMethod: paymentMethod,
    })

    await order.save();
    res.status(200).json({message: "Order created successfully"});
  }
  catch (err) {
    console.log("Error submitting order", err)
    res.status(500).json({ message: "Error submitting order" });
  }
})

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({user});
  }
  catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
})

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({user: userId}).populate("user");

    
    if (!orders || orders.length === 0) {
      res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({orders});
  }
  catch (err) {
    res.status(500).json({ message: "Error retrieving orders" });
  }
})
