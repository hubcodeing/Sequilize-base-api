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

const match = async (req, res) => {
  try {
    const notes = await model.notes.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.body.id) } },
    ]);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
const project = async (req, res) => {
  try {
    const notes = await model.notes.aggregate([
      { $project: { _id: 0, discription: 1 } },
    ]);

    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const addfilds = async (req, res) => {
  try {
    const notes = await model.notes.aggregate([{ $addFields: { age: 50 } }]);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
const size = async (req, res) => {
  try {
    const notes = await Notes.aggregate([
      {
        $project: {
          age: 1,
          numberOfAge: {
            $cond: {
              if: { $isArray: "$age" },
              then: { $size: "$age" },
              else: "NA",
            },
          },
        },
      },
    ]);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const look = async (req, res) => {
  try {
    const notes = await model.notes.aggregate([
      {
        $lookup: {
          from: "logins",
          localField: "userId",
          foreignField: "_id",
          as: "new_docs",
        },
      },
      {
        $project: {
          userId: 1,
          numberOfuserId: {
            $cond: {
              if: { $isArray: "$_id" },
              then: { $size: "$_id" },
              else: "NA",
            },
          },
        },
      },
    ]);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
const lookup = async (req, res) => {
  try {
    const notes = await model.login.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.id),
        },
      },

      {
        $lookup: {
          from: "notes",
          localField: "_id",
          foreignField: "userId",
          as: "NotesData",
        },
      },
      { $addFields: { Total: { $size: { $ifNull: ["$NotesData", []] } } } },
    ]);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
const combine = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      const data = await model.notes.create({
        ...req.body,
        userId: req.body.id,
      });
      infoLogger.info(data);
      res.status(200).json({ success: true, message: "post", data });
    } else {
      const data = await Notes.findByIdAndUpdate(id, req.body);
      infoLogger.info(data);
      res.status(200).json({ success: true, message: "id update", data });
    }
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
const jjj = async (req, res) => {
  try {
    let filter = {};
    if (req.query.title) {
      filter = { ...filter, title: req.query.title };
    }
    if (req.query.discription) {
      filter = { ...filter, discription: req.query.discription };
    }
    if (req.query.age) {
      filter = { ...filter, age: req.query.age };
    }
    const notes = await model.notes.find(filter);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "title get ", notes });
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
  match,
  project,
  addfilds,
  size,
  look,
  lookup,
  combine,
  jjj,
  uuu,
};
