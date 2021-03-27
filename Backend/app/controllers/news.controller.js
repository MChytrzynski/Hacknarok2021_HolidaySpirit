const db = require("../models");
const News = db.news;
const Tags = db.tags;
const Op = db.Sequelize.Op;

// Create and Save
/*exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a News
    const news = {
      title: req.body.title,
      content: req.body.content,
      url: req.body.url,
      origin: req.body.origin,
      veracityAI: req.body.veracityAI,
      veracityUser: req.body.veracityUser,
      publishDate: req.body.publishDate,      
    };
  
    // Save element in the database
    News.create(news)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the record."
        });
      });
  };*/

  exports.create = (news) => {
    return News.create({
      title: news.title,
      content: news.content,
      url: news.url,
      origin: news.origin,
      veracityAI: news.veracityAI,
      veracityUser: news.veracityUser,
      publishDate: news.publishDate,
    })
      .then((news) => {
        console.log(">> Created News: ");
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
        attributes: ["id", "name"],
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

/*// Find a single element
exports.findOne = (req, res) => {
  
};

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