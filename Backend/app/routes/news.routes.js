module.exports = app => {
    const news = require("../controllers/news.controller.js");
  
    var router = require("express").Router();
  
    // Create
    router.post("/", news.create);
  
    // Retrieve all 
    router.get("/", news.findAll);
    app.use('/api/news', router);
};