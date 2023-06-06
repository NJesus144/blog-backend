import User from "../models/User.js";
import jwt from "jsonwebtoken";

const SECRET_JWT = "df6923b8c84dd6e81142fac5423e418d";

const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

const generateToken = (id) =>
  jwt.sign({ id: id }, SECRET_JWT, { expiresIn: 86400 });

export { loginService, generateToken };
