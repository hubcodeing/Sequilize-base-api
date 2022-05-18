export default (connection, Sequelize) => {
  return connection.define("csv", {
    user: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
};
