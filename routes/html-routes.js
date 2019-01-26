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

  //index route loads view.html
  // app.get("/", function(req, res) {
  //   console.log("html routes");  
  //   res.render("index");
  // });

    app.get("/main", function (req, res) {
          res.render("main1", {});
      })
    app.get("/addother", function (req, res) {
      res.render("addOther", {});
    })
    app.get("/resources", function (req, res) {
      res.render("resources", {});
    })
    app.get("/add", function (req, res) {
      res.render("add", {});
    })
    app.get("/index", function (req, res) {
      res.render("index", {});
    })

    app.get("/profile/:id", function(req, res){
      //use id to query pet out of the database
  
      db.Pet.findById(req.params.id).then(function(petData){
        console.log(petData);
        res.render("petsProfile", {
          petData: petData
        })
      })
    })
    app.get("/updatepet/:id", function(req, res){
      //use id to query pet out of the database
  
      db.Pet.findById(req.params.id).then(function(petData){
        console.log(petData);
        res.render("updatePet", {
          petData: petData
        })
      })
    })
  };
