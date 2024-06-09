const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "KYYZEN_API098";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if ((!name, !email, !password)) {
      return res.status(400).json({
        message: "All Fields are Required",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email: email,
      name: name,
      password: hashedPassword,
    });

    res.status(200).json({
      status: 200,
      message: "User Registration Successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

const generateToken = (user) => {
  return jwt.sign({ user_id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "7h",
  });
};

const sendResponse = (
  res,
  code,
  status,
  message,
  token = null,
  userId = null
) => {
  const response = { code, status, message };
  if (token) response.token = token;
  if (userId) response.userId = userId;
  res.status(code).json(response);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(res, 400, "failed", "All Fields are Required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, "failed", "You are not a Registered User");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.email !== email) {
      return sendResponse(res, 400, "failed", "Email or Password is not Valid");
    }

    const token = generateToken(user);
    return sendResponse(
      res,
      200,
      "success",
      "Login Successfully",
      token,
      user._id
    );
  } catch (error) {
    console.error("Login error:", error);
    return sendResponse(res, 500, "failed", "Unable to Login");
  }
};

module.exports = { signup, login };
