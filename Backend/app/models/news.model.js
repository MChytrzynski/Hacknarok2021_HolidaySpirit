module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      source: {
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