import { Sequelize } from "sequelize";
import { _userModel, _notesModel, _employeeModels } from "./index";

export default (connection) => {
  const userModel = _userModel(connection, Sequelize);
  const notesModel = _notesModel(connection, Sequelize);
  const employeeModel = _employeeModels(connection, Sequelize);

  userModel.hasMany(notesModel, {
    as: "userid",
    foreignKey: "userId",
  });
  return { userModel, notesModel, employeeModel };
};
