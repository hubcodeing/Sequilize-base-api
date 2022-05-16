export default (connection, Sequelize) => {
  return connection.define("notes", {
    title: {
      type: Sequelize.STRING,
    },
    discription: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
};
