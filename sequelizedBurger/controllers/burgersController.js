// ===============================================================
//                          Dependencies
// ===============================================================

var db = require("../models");

// ===============================================================
//                             Routes
// ===============================================================

module.exports = function(app) {

  // get route -> index
  app.get("/", function(req, res) {
    res.redirect("/burgers");
  });

  app.get("/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    db.burger.findAll({}).then(function(burgerData) {
      // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
      res.render("index", { burger_data: burgerData });
    });
  });

  // post route -> back to index
  app.post("/burgers/create", function(req, res) {
    // takes the request object using it as input for burger.addBurger
    db.burger.create(req.body.burger_name, function(result) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log(result);
      res.redirect("/");
    });
  });

  // put route -> back to index
  app.put("/burgers/:id", function(req, res) {
    db.burger.update(req.params.id, function(result) {
      // wrapper for orm.js that using MySQL update callback will return a log to console,
      // render back to index with handle
      console.log(result);
      // Send back response and let page reload from .then in Ajax
      res.sendStatus(200);
    });
  });

}