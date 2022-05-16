export default (connection, Sequelize) => {
  return connection.define("employee", {
    employeeid: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    jobTitle: {
      type: Sequelize.STRING,
    },
  });
};
