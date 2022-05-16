import { Sequelize } from "sequelize";
import { initializeModels } from "../models";

const connection = new Sequelize("postgres", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

initializeModels(connection);

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;

export default db;
