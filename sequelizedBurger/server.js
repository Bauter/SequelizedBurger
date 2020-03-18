// ===============================================================
//  Dependencies
// ===============================================================

var express = require("express");


// ================================================================
// Sets up the Express App
// ================================================================

var PORT = process.env.PORT || 8000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requiring our models for syncing
var db = require("./models");

// Require handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//================================================================
// Routes
//================================================================

// Method used in class to define route
require("./controllers/burgersController")(app);


// ===============================================================
// Syncing our sequelize models and then starting our Express app
// ===============================================================

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
});