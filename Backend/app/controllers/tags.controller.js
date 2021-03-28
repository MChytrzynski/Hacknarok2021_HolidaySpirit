const db = require("../models");
const News = db.news;
const Tags = db.tags;

exports.findAll = () => {
    return Tags.findAll({
      include: [
        {
          model: News,
          as: "news",
          attributes: ["id", "title"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((tags) => {
        return tags;
      })
      .catch((err) => {
        console.log(">> Error while retrieving Tags: ", err);
      });
  };

  exports.addNews = (tagId, newsId) => {
    return Tags.findByPk(tagId)
      .then((tags) => {
        if (!tags) {
          console.log("Tag not found!");
          return null;
        }
        return News.findByPk(newsId).then((news) => {
          if (!news) {
            console.log("News not found!");
            return null;
          }
  
          tags.addNews(news);
         // console.log(`>> added News id=${news.id} to Tag id=${tags.id}`);
          return tags;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding News to Tag: ", err);
      });
  };


  exports.create = (tags) => {
    return Tags.create({
      tagname: tags.tagname,
    })
      .then((tags) => {
       // console.log(">> Created Tag: " + JSON.stringify(tags, null, 2));
        return tags;
      })
      .catch((err) => {
        console.log(">> Error while creating Tag: ", err);
      });
  };

  exports.findById = (id) => {
    return Tags.findByPk(id, {
      include: [
        {
          model: News,
          as: "news",
          attributes: ["id", "title", "description", "source", "veracityAI", "veracityUser"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((tags) => {
        return tags;
      })
      .catch((err) => {
        console.log(">> Error while finding Tag: ", err);
      });
  };


  exports.findByName = (name) => {
    return Tags.findAll({
      where:{
        tagname: name
      }
    })
      .then((tags) => {
        return tags;
      })
      .catch((err) => {
        console.log(">> Error while finding Tag: ", err);
      });
  };

