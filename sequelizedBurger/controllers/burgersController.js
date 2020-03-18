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
      console.log(burgerData.burger) // data containing 
      // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
      res.render("index", { burger_data: burgerData });
    });
  });

  // post route -> back to index
  app.post("/burgers/create", function(req, res) {

    console.log(req.body.burger_name)
    // takes the request object using it as input for burger.addBurger
    db.burger.create({
      burger_name: req.body.burger_name
     }).then(function(result) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log(result);
      res.redirect("/");
    });
  });

  // put route -> back to index
  app.put("/burgers/:id", function(req, res) {
    db.burger.update(
      {
        devoured: true
      },
      {
        where: {
          id: req.params.id
        }
      }).then(function(result) {
      // wrapper for orm.js that using MySQL update callback will return a log to console,
      // render back to index with handle
      console.log(result);
      // Send back response and let page reload from .then in Ajax
      res.sendStatus(200);
      });

  });

  app.get("/api/customer", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.customer.findAll({}).then(function(customer) {
      res.json(customer);
    });
  });
}