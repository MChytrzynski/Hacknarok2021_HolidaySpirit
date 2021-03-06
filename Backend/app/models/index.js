const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.news = require("./news.model.js")(sequelize, Sequelize);
db.tags = require("./tags.model.js")(sequelize, Sequelize);

db.tags.belongsToMany(db.news, {
  through: "news_tag",
  as: "news",
  foreignKey: "tag_id",
});
db.news.belongsToMany(db.tags, {
  through: "news_tag",
  as: "tags",
  foreignKey: "news_id",
});


module.exports = db;
