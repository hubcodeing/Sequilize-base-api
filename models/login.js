export default (connection, Sequelize) => {
  return connection.define("login", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    profile_file: {
      type: Sequelize.STRING,
    },
    // profile_url: {
    //   type: Sequelize.STRING,
    // },
  });
};
