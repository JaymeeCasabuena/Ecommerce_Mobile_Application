const User = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "fakestore.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/auth/verify/${verificationToken}`,
  };

  try {
    console.log(`Sending verification email to: ${email}`);
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to: ${email}`);
  } catch (err) {
    console.log("Error sending verification email", err.message);
    throw new Error("Failed to send verification email");
  }
};

// Registration function
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registering user:", { name, email });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Email already registered: ${email}`);
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashing password
    console.log(`Password hashed for user: ${email}`);

    const newUser = new User({ name, email, password: hashedPassword });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    console.log(`Generated verification token for user: ${email}`);

    await newUser.save();
    console.log(`User registered: ${email}`);

    await sendVerificationEmail(newUser.email, newUser.verificationToken); // Await email sending
    res
      .status(200)
      .json({ message: "User registered. Verification email sent." });
  } catch (err) {
    console.log("Error during registration", err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// Email verification function
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(`Verifying email with token: ${token}`);

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      console.log(`Invalid verification token: ${token}`);
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    console.log(`Email verified for user: ${user.email}`);

    res.status(200).json({ message: "Email verification successful" });
  } catch (err) {
    console.log("Error during email verification", err);
    res
      .status(500)
      .json({ message: "Verification failed", error: err.message });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Attempting to log in user:", { email });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`Invalid email or password for user: ${email}`);
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.verified) {
      console.log(`Account not verified for user: ${email}`);
      return res.status(403).json({ message: "Account not verified" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    console.log(`Login successful for user: ${email}`);
    res.status(200).json({ token });
  } catch (err) {
    console.log("Error during login", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
