const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// @route POST /api/users/register
// @desc register new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill all fields.");
  }

  // check if user exists
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400)
    throw new Error("User already exists.");
  }

  // generate salt & hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email, 
      token: generateToken(user._id)
    });
  } else {
    res.status(400)
    throw new Error("Invalid user data");
  }
});

// @route POST /api/users/login
// @desc authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; 

  if (!email || !password ) {
     res.status(400);
     throw new Error("Please email/password field are required.");
  }

  // check user email
  const user = await User.findOne({email});
  // compare req.body{password} in user's password
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400)
    throw new Error("Invalid credentials");
  }
});

// @route GET /api/users/
// @desc get user data
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User data retrieved successfully.",
    user: req.user
  });
});

// generate json web token & sign
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser
};