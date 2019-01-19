// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    console.log("html routes");  
    res.render("index");
  });

  app.get("/main/:id", function (req, res) {
    User.findByID(req.params.id)      
      
    }).then(function (results) {
      console.log("results: ", results);
      res.render("profile", { profile: results });
    });
};
