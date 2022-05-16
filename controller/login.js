import { db } from "../config";
import generator from "generate-password";
import nodemailer from "nodemailer";
import csv from "csv-parser";
import fs from "fs";
import { infoLogger, errorLogger } from "../logger";
import path from "path";
import { upload } from "../middelware";
import jwt from "jsonwebtoken";
const model = db.connection.models;
require("dotenv").config();
let __basedir = path.resolve();

const secret = process.env.SECRET;
const email = process.env.EMAIL;
const name = process.env.PASS;

const register = async (req, res) => {
  try {
    var password = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log(password);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: name,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // console.log("transporter", transporter);
    let mailOptions = {
      from: email,
      to: req.body.email,
      subject: "password verification",
      text: "use this password for signup" + password,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error send me", error);
      }
      console.log("info me", info);
      //   res.json("contact", { message: "Email has been sent" });
    });

    let user = await model.login.create({ ...req.body }, password);
    console.log(user);
    infoLogger.info("hello");
    res
      .status(200)
      .json({ success: true, message: "register successfully", data: user });
  } catch (error) {
    errorLogger.error("hello");
    res.status(400).json({ success: false, message: "error" });
  }
};
const csvfileUpload = async (req, res) => {
  try {
    let Tutorial = [];
    let path = __basedir + "/file/" + req.file.filename;
    console.log("path", path);
    fs.createReadStream(path)
      .pipe(csv())
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        Tutorial.push(row);
      })
      .on("end", () => {
        console.log("todos", Tutorial);
        model.employee.bulkCreate(Tutorial);
        fs.unlinkSync(path);
      });
    infoLogger.info(req.file);
    res.status(200).json({
      success: true,
      message: "csv file uplaod successfully",
    });
  } catch (error) {
    errorLogger.error("error");
    res.status(400).json({ success: false, message: "error" });
  }
};
const login = async (req, res) => {
  try {
    const user = await model.login.findAll({
      where: { email: req.body.email },
    });
    if (!user) {
      errorLogger.error(err.message);
      return res
        .status(200)
        .json({ success: false, message: "user is already login" });
    } else
      var token = jwt.sign({ email: user.email }, secret, {
        expiresIn: "1h",
      });
    console.log(token);
    infoLogger.info(user);
    res.status(200).json({ success: true, token: token });
  } catch (err) {
    res.status(400).json({ success: false, message: "login  unsuccessfull" });
  }
};
const getid = async (req, res) => {
  try {
    const notes = await model.login.findByPk(req.params.id);
    if (!notes) throw new Error("data not find ");
    else infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { email, name } = req.body;
    const { id } = req.params;
    const notes = await model.login.update(
      {
        name,
        email,
      },
      {
        where: { id },
      }
    );
    console.log(notes);
    infoLogger.info(notes);
    res
      .status(200)
      .json({ success: true, message: "data update successfully ", notes });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
const pop = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(req.params);
    const user = await model.login.destroy({
      where: {
        id,
      },
    });
    if (!user) throw new Error("user is not valid");
    infoLogger.info(user);
    res.status(200).json({ success: true, message: "delete data", user });
  } catch (err) {
    errorLogger.error(err.message);
    console.log("HELLO", err);

    res.status(400).json({ success: false, message: err.message });
  }
};

const profileurlpath = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      const body = { ...req.body, profile_file: req.file.filename };
      const user = await model.login.create({
        ...req.body,
        profile_file: req.file.filename,
      });

      console.log(user);
      res.status(200).json({
        success: true,
        message: "photo upload successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: "Please select photo" });
    }
  });
};

export default {
  register,
  csvfileUpload,
  login,
  getid,
  update,
  pop,
  profileurlpath,
};
