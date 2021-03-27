const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');

const app = express();

const db = require("./app/models");
const NewsController = require("./app/controllers/news.controller");
const TagsController = require("./app/controllers/tags.controller");

let rawdata = fs.readFileSync('data/response.json');
let news_data = JSON.parse(rawdata);

news_articles = news_data.articles;

news_articles.forEach(obj => {
  Object.entries(obj).forEach(([key, value]) => {
      console.log(`${key} ${value}`);
  });
  console.log('-------------------');
});



/*const run = async () => {
  const tut1 = await NewsController.create({
    title: "#1",
    description: "#1 Description",
    url: "ses.eer",
    source: "portal",
    veracityAI: 54.22,
    veracityUser: 99.44,
    publishDate: "2017-06-15 09:34:21",
  });
  const tut2 = await NewsController.create({
    title: "#2",
    description: "#2 Description",
    url: "ses.eer",
    source: "portal",
    veracityAI: 54.22,
    veracityUser: 99.44,
    publishDate: "2017-06-15 09:34:21",
  });
  const tut3 = await NewsController.create({
    title: "#3",
    description: "#3 Description",
    url: "ses.eer",
    source: "portal",
    veracityAI: 54.22,
    veracityUser: 99.44,
    publishDate: "2017-06-15 09:34:21",
  });
  const tut4 = await NewsController.create({
    title: "#4",
    description: "#4 Description",
    url: "ses.eer",
    source: "portal",
    veracityAI: null,
    veracityUser: null,
    publishDate: "2017-06-15 09:34:21",
  });

  const tag1 = await TagsController.create({
    name: "Tag#1",
  });

  const tag2 = await TagsController.create({
    name: "Tag#2",
  });

  await TagsController.addNews(tag1.id, tut1.id);

  await TagsController.addNews(tag1.id, tut2.id);

  await TagsController.addNews(tag1.id, tut3.id);

  await TagsController.addNews(tag2.id, tut3.id);

  await TagsController.addNews(tag2.id, tut4.id);

  await TagsController.addNews(tag2.id, tut1.id);

  const _tag1 = await TagsController.findById(tag1.id);
  console.log(">> tag1", JSON.stringify(_tag1, null, 2));
  
};*/

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  //run();
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
  res.json({ message: "Welcome to this application." });
});

require("./app/routes/news.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
