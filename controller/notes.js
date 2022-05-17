import { disabled } from "express/lib/application";
import { db } from "../config";
const model = db.connection.models;
import { infoLogger, errorLogger } from "../logger";
import { _userModel } from "../models";
import login from "../models/login";

const user = async (req, res) => {
  try {
    infoLogger.info(req.body, req.user.id);
    const notes = await model.notes.create({
      ...req.body,
      userId: req.user.id,
    });
    res
      .status(200)
      .json({ success: true, message: " data post  successfully", notes });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
const get = async (req, res) => {
  try {
    const notes = await model.notes.findAll();
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
const getid = async (req, res) => {
  try {
    infoLogger.info(req.params.id);
    const notes = await model.notes.findByPk(req.params.id);
    if (!notes) throw new Error("data not find ");
    else res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const genius = async (req, res) => {
  try {
    const { title, discription, age } = req.body;
    console.log(title, discription, age);
    const { id } = req.params;
    console.log(id);
    const notes = await model.notes.update(
      { title, discription, age },
      {
        where: { id },
      }
    );
    console.log(notes);
    if (!notes) throw new Error("id is not find");
    res.status(200).json({
      success: true,
      message: "data update    in notes",
      notes,
    });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
const combine = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      const data = await model.notes.create({
        ...req.body,
        userId: req.user.id,
      });
      infoLogger.info(data);
      res.status(200).json({ success: true, message: "post", data });
    } else {
      const { title, discription, age } = req.body;

      const data = await model.notes.update(
        { title, discription, age },
        {
          where: { id },
        }
      );
      infoLogger.info(data);
      res.status(200).json({ success: true, message: "id update", data });
    }
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
const note = async (req, res) => {
  try {
    const { id } = req.query;
    const notes = await model.notes.destroy({ where: { id } });
    if (!notes) throw new Error("id is not found");
    res.status(200).json({
      success: true,
      message: " data delete successfully",
      data: notes,
    });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const uuu = async (req, res) => {
  try {
    const notes = await model.login.findAll({
      include: [{ model: model.notes, as: "userid" }],
    });
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  user,
  get,
  getid,
  genius,
  note,
  combine,
  uuu,
};
