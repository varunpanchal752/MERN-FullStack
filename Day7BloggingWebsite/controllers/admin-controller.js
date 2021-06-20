const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require('../models/admin');
const HttpError = require("../utils/http-error");

const adminSignup = async (req, res,next) => {
    const { firstname, lastname, email, password } = req.body;
    let existingAdmin;
    try {
      existingAdmin = await Admin.findOne({
        email: email,
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError("Signup failed, please try later", 500);
    return next(error);
    }
  
    if (existingAdmin) {
      const error = new HttpError("Email already in use", 422);
      return next(error);
    }

    let hashedPasswaord;
    try {
      hashedPasswaord = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError("Password encryption failed", 500);
    return next(error);
  }
  
    const createdAdmin = new Admin({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPasswaord,
    });
  
    try {
      await createdAdmin.save();
    } catch (err) {
      console.log(err);
      const error = new HttpError("Signup failed", 500);
      return next(error);
    }
  
    return res.json({
      meassage:"Admin signed up successful",
      AdminId: createdAdmin.id,
      email: createdAdmin.email
    });
  };
  
const adminLogin = async (req, res,next) => {
    const { email, password } = req.body;
  
    let existingAdmin;
    try {
      existingAdmin = await Admin.findOne({
        email: email,
      });
    } catch (err) {
      const error = new HttpError("Login failed, Please try later", 500);
      return next(error);
      }
  
    if (!existingAdmin) {
      const error = new HttpError("Invalid Credentials, Please try later", 403);
      return next(error);
    }
  
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingAdmin.password);
    } catch (err) {
      const error = new HttpError("Invalid Credentials, Please try later", 403);
      return next(error);
    }
  
    if (!isValidPassword) {
      const error = new HttpError("Invalid Credentials, Please try later", 403);
    return next(error);
    }
  
    res.status(200).json({
      message:"Admin logged in successful",
      email: existingAdmin.email,
    });
  };
  
exports.adminSignup = adminSignup;
exports.adminLogin = adminLogin;