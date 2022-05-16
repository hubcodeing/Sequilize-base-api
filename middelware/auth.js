import jwt from "jsonwebtoken";
import { db } from "../config";
const model = db.connection.models;
require("dotenv").config();
const secret = process.env.SECRET;
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    if (!token) throw new Error("token is not Authorization");
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    if (!decoded) throw new Error("id  is not decoded");
    const user = await model.login.findOne({
      _id: decoded.id,
    });
    console.log("hello", user);
    if (!user) throw new Error("user is not found ");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};
export default auth;
