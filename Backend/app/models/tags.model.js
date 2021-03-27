module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tags", {
      tagname: {
        type: Sequelize.STRING
      }
    });
    return Tags;
  };