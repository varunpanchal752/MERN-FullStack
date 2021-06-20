const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blog = require("../models/blog");
const HttpError = require("../utils/http-error");

const userSignup = async (req, res, next) => {
  const { firstname, lastname, email, password, dob } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({
      email: email,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signup failed, please try later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Email already in use", 422);
    return next(error);
  }

  let hashedPasswaord;
  try {
    hashedPasswaord = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    const error = new HttpError("Password encryption failed", 500);
    return next(error);
  }

  const createdUser = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPasswaord,
    dob: dob
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signup failed", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      "userSecretKey",
      { expiresIn: "3h" }
    );
  } catch (err) {
    const error = new HttpError("Login Failed, Please try later", 403);
    return next(error);
  }

  return res.json({
    userId: createdUser.id,
    email: createdUser.email,
    token:token
  });
};

const userLogin = async (req, res,next) => {
  const { email, password } = req.body;

  var existingUser;
  try {
    existingUser = await User.findOne({
      email: email,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Login failed, Please try later", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid Credentials, Please try later", 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Invalid Credentials, Please try later", 403);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid Credentials, Please try later", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "userSecretKey",
      { expiresIn: "3h" }
    );

  } catch (err) {
    const error = new HttpError("Login Failed, Please try later", 403);
    return next(error);
  }

  res.status(200).json({
    email: existingUser.email,
    dob: existingUser.dob,
    token:token
  });
};

const getUser = async(req, res,next) => {
  const {email} = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({
      email: email,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("no user found", 500);
    return next(error);
  }

    if(existingUser){
      res.json({
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        password: existingUser.password,
        dob: existingUser.dob
      })
    }
};

const postBlog = async(req, res,next) => {
  const { firstname,blogheading, blogpost, bloguserID} = req.body;
  const newBlog = new Blog({
    heading: blogheading,
    blog: blogpost,
    userID: bloguserID
  });

  try {
    await newBlog.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("blog uploading failed", 500);
    return next(error);
  }
  return res.json({
    "message": `Post created by user ${firstname}`
  });
}

const getBlog = async(req, res, next) => {
  const {bloguserID} = req.body;
  let existingBlog;
  try {
    existingBlog = await Blog.findOne({
      userID: bloguserID ,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("no Blog found", 500);
    return next(error);
  }

    if(existingBlog){
      res.json({
        heading: existingBlog.heading,
        blog: existingBlog.blog,
      })
    }
};


exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.getUser = getUser;
exports.postBlog = postBlog;
exports.getBlog = getBlog;
