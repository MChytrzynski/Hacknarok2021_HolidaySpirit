const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const app = express();

const corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true,
};
app.use(cors(corsOptions));

const db = require("./app/models");
const NewsController = require("./app/controllers/news.controller");
const TagsController = require("./app/controllers/tags.controller");
const { Console } = require("console");

const parse_news = () => {
  let rawdata = fs.readFileSync("data/response.json");
  let news_data = JSON.parse(rawdata);

  let news_articles = news_data;

  news_articles.forEach((obj) => {
        axios
        .post("http://eca20c80a8d3.ngrok.io/fakebox/check", {
          title: obj.title,
          content: obj.content,
        })
        .then(
          (response) => {
            //console.log(response.data.content.keywords);
            keywords = response.data.content.keywords;
            
            //console.log(response.data.title.score);
            let run = async () => {
              let tut1 = await NewsController.create({
                title: obj.title,
                description: obj.content,
                url: obj.url,
                source: obj.source.name,
                veracityAI: response.data.content.score*100,
                veracityUser: Math.floor(Math.random() * Math.floor(100)),
                publishDate: obj.publishedAt,
              }); 
        
            keywords.forEach((word) => {
              
              (async () => {
                let exist_tag = await TagsController.findByName(word.keyword);
                if (exist_tag == "") {
                  let tag1 = await TagsController.create({ tagname: word.keyword });
                  await TagsController.addNews(tag1.id, tut1.id);
                } else {
                  await TagsController.addNews(
                    exist_tag[0].dataValues.id,
                    tut1.id
                  );
                }
              })();
            });
          };
          
    run();
          },
          (error) => {
            console.log(error);
          }
        );
          

  });
};  

db.sequelize.sync().then(() => {
  //parse_news();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  const teet = async () => {
    let x = [];
    for (let i = 0; i < 200; ) {
      const _tag1 = await NewsController.findById(i + 1);
      x[i] = _tag1;
      i++;
    }
    res.json(x);
  };
  teet();
});

require("./app/routes/news.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});