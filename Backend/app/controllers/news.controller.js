const db = require("../models");
const News = db.news;
const Tags = db.tags;
const Op = db.Sequelize.Op;

  exports.create = (news) => {
    return News.create({
      title: news.title,
      description: news.description,
      url: news.url,
      source: news.source,
      veracityAI: news.veracityAI,
      veracityUser: news.veracityUser
    })
      .then((news) => {
        //console.log(">> Created News: ");
        return news;
      })
      .catch((err) => {
        console.log(">> Error while creating News: ", err);
      });
  };

// Retrieve all 
exports.findAll = (req, res) => {
  
    News.findAll({include: [
      {
        model: Tags,
        as: "tags",
        attributes: ["id", "tagname"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ], })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving record."
        });
      });
  };

  exports.findById = (id) => {
    return News.findByPk(id, {
      include: [
        {
          model: Tags,
          as: "tags",
          attributes: ["id", "tagname"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((news) => {
        return news;
      })
      .catch((err) => {
        console.log(">> Error while finding News: ", err);
      });
  };
/*
// Update by id in the request
exports.update = (req, res) => {
  
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all 
exports.deleteAll = (req, res) => {
  
};

// Find all
exports.findAllPublished = (req, res) => {
  
};
*/