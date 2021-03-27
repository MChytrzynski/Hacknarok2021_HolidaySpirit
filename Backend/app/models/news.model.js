module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      veracityAI: {
        type: Sequelize.FLOAT(11)
      },
      veracityUser: {
        type: Sequelize.FLOAT(11)
      },
      publishDate: {
        type: Sequelize.DATE
      }
    });
  
    return News;
  };