import { Sequelize } from "sequelize";
import { initializeModels } from "../models";
require("dotenv").config();

const connection = new Sequelize(
  process.env.DATABASE,
  process.env.UN,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
  }
);

initializeModels(connection);

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;

export default db;
