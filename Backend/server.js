const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

const db = require("./app/models");
const NewsController = require("./app/controllers/news.controller");
const TagsController = require("./app/controllers/tags.controller");
const { Console } = require("console");


const parse_news = () => {
  let rawdata = fs.readFileSync("data/response.json");
  let news_data = JSON.parse(rawdata);

  news_articles = news_data.articles;
  

  news_articles.forEach((obj) => {
    let run = async () => {
      let tut1 = await NewsController.create({
        title: obj.title,
        description: obj.description,
        url: obj.url,
        source: "portal",
        veracityAI: Math.floor(Math.random() * Math.floor(100)),
        veracityUser: Math.floor(Math.random() * Math.floor(100)),
        publishDate: obj.publishedAt,
      });

      let tag1 = await TagsController.create({
        tagname: "Tag#1",
      });
      await TagsController.addNews(tag1.id, tut1.id);

      
    };
    

    run();
    
  });
  
};


db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  parse_news();
 
});

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to this application." });
  const teet = async() => {
    let x = [];
    for (let i = 0; i < 10; i++) {
      const _tag1 = await TagsController.findById(i);
          //console.log(JSON.stringify(_tag1, null, 2));
          x[i] = _tag1;
    }
    res.json(x);
    }
    teet();
  
});

require("./app/routes/news.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
