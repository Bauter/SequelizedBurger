# SequelizedBurger

The purpose of this app. is to create a burger logger with MySQL, Node, Express, Handlebars and sequelize

### Link to app

https://sequelized-burger-app-8686.herokuapp.com/

## What you will need 

-explanations to follow

1. A code editor, I prefer Visual Studio Code ("https://code.visualstudio.com/").
2. Node.js to run node commands in terminal ("https://nodejs.org/en/download/").
3. '.gitignore' file to write what files you would not like to upload. 
4. NPM packages: 'express-handlebars', 'mysql2', '@handlebars/allow-prototype-access', 'express', and 'sequelize'.
5. MySQL downloaded (you will need MySQL workbench) ("https://www.mysql.com/downloads/").

## Lets get set up!

Create a project folder (to save time you can clone this repository and skip the steps you don't need.)

```
.
├── config
│   ├── connection.js
│   └── config.json
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       |── img
│       |  └── burger.png 
│       └── js
│           └── script.js  
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```

2. In the root of your project folder in terminal and run "npm init -y". This will initialize a "package.json" file for your project. (this is required to install npm packages).

3. Inside your '.gitignore' file add the following line. (this will prevent git from uploading these files).
```
node_modules
```

4. Inside terminal once again Install all  relevant NPM packages via the following command:
    - `$ npm i express`

    - `$ npm i mysql2`

    - `$ npm i express-handlebars`

    - `$ npm i @handlebars/allow-prototype-access`

    - `$ npm i sequelize`

5. Run `sequelize init` to create the necessary files ('index.js' & 'config.json').

6. Use MySql Workbench to create a database called "burger_db".

### Schema & Seeds

Start by defineing your schema and seeds files like so:

##### Schema.sql

```
CREATE DATABASE IF NOT EXISTS burgers_db;
USE burgers_db;

-- If the table already exists, remove it before trying to create the table again
DROP TABLE IF EXISTS burgers;

-- Create the burgers table
CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger_name varchar(255) NOT NULL,
    devoured BOOL DEFAULT false,
    PRIMARY KEY (id)
);

-- Customer table

CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    eaten BOOL DEFAULT false,
    PRIMARY KEY (id)
);

```

##### Seeds.sql

```
-- Insert data into burgers table

INSERT INTO burgers (burger_name, devoured) VALUES ('Cheese Burger', FALSE);
INSERT INTO burgers (burger_name, devoured) VALUES ('Hamburger', FALSE);
INSERT INTO burgers (burger_name, devoured) VALUES ('Pizza Burger', FALSE);

-- Insert data into customers table

INSERT INTO customers (customer_name, eaten) VALUES ('Bill', FALSE);
INSERT INTO customers (customer_name, eaten) VALUES ('Frank', FALSE);
INSERT INTO customers (customer_name, eaten) VALUES ('John', FALSE);
INSERT INTO customers (customer_name, eaten) VALUES ('Todd', FALSE);

```

### burger.js

Define the burger model to be used.

```
//==================================================
//          New Burger Modal 
//==================================================

  
module.exports = function(sequelize, DataTypes) {
  let burger = sequelize.define("burger", {
    
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
  },
  {
    timestamps: false
  });


  return burger;

};

```

### burgerController.js

In this file, we will define our routes

```
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
    
    db.customer.findAll({}).then(function(customer) {
      res.json(customer);
    });
  });
}

```

### server.js

Define your server like so:

```
// ===============================================================
//  Dependencies
// ===============================================================

// Require handlebars
var exphbs = require("express-handlebars");
var express = require("express");

// add package to allow prototype methods
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Requiring our models for syncing
var db = require("./models");

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

app.engine("handlebars", exphbs({ 
  defaultLayout: "main",
  handlebars : allowInsecurePrototypeAccess(Handlebars)           //added this line to allow prototypes (see line 9)
}));
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

```

##### NOTE:

-Pay close attention to how '@handlebars/allow-prototype-access' is used in this file. The purpose of this is to avoid any 'sequelized' errors cause by defiening new properties of an object. for more information on this error please see (https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access).

### Config.json

Follow the following format if you plan to use 'Heroku' for your hosting

```
{
  "development": {
    "username": "MYSQL username goes here",
    "password": "MYSQL password goes here",
    "database": "burgers_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "MYSQL username goes here",
    "password": "MYSQL password goes here",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable":"JAWSDB_URL",
    "dialect": "mysql"
  } 
}
```

##### NOTE:

-Pay close attention to 'production' in 'config.json'. Set the key value pairs to the above format. When 'creating' the app on heroku, go to the app. dashboard, select 'resources'. You should see a search bar for "Add-ons". Search for "jawsDB" select the add-on "JAWSDB" and select the basic free plan (you will be prompted to enter CC information to verify your Heroku account and proceed with this add-on).

### Handlebars

We have 2 handlebars files, 'main' and 'index'.

##### main.handlebars

```
<html lang="en">
	<head>
		<title>Eat-da-burger</title>
		<meta charset="UTF-8">
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="/assets/css/style.css" type="text/css" />
	</head>
	<body>
		{{{ body }}}

	{{!-- Add in jQuery --}}
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="/assets/js/script.js"></script>
	</body>
</html>

```

##### index.handlebars

```
<div class="container">
	<div class="row">
		<div class="col-md-12 text-center" id="top-bar">
			<img src="/assets/images/burger.png" alt="burger" />
			<h1> Eat-Da-Burger! </h1>
		</div>
		<div class="col-md-6 text-center" class="task">
			<div class="row">
			  {{#each burger_data}}
			  	{{#unless this.devoured}}
				<div class="col-md-9 text-center">
					<pre>{{this.id}}. {{this.burger_name}}
					</pre>
				  		<!-- {{this.Date}} -->
				</div>
				<div class="col-md-3 text-center">
					<form class="devour-form button-size">
						<input type='text' id="customerNameInput" style="width: 100%;" required> <!--fresh line to try and create user input-->
						<input input type="hidden" class="burger_id" type="text" value={{this.id}}><br>
						<button type="submit" class="btn btn-default">Devour it!</button>
					</form>
				</div>
				{{/unless}}
			  {{/each}}
			</div>
		</div>
		<div class="col-md-6 text-center" class="task">
			  {{#each burger_data}}
			  	{{#if this.devoured}}
			  		<input class="form-control" type="text" placeholder="{{this.id}} . {{this.burger_name}} (EATEN BY: {{this.customer_name}})" readonly>
				{{/if}}
			  {{/each}}
		</div>
	</div>
</div>

<div class="container">
	<div class="row">
		<div class="col-md-12 text-center enter_section">
			<form action="/burgers/create" method="POST">
				<input type="text" class="form-control" name="burger_name" value="" id="enter_text">
				<button type="submit" class="btn btn-primary" id="text-enter-button">Submit</button>
			</form>
			<p>Enter a burger you want to eat Click the "Submit" button.</p>
		</div>
	</div>
</div>


```

### script.js

Your front-end JS code in the 'public' directory should look like this:

```
$(document).ready(function() {
    
  $(".devour-form").on("submit", function(event) {
    event.preventDefault();

    var burger_id = $(this).children(".burger_id").val();
    console.log(burger_id);
    $.ajax({
      method: "PUT",
      url: "/burgers/" + burger_id
    }).then(function(data) {
      // reload page to display devoured burger in proper column
      location.reload();
    });

  });
});


```

## Guidelines for Collaboration ##

-As I am still new to coding, and my initial projects will be used to create a portfolio to show to potential employers, i ask that no modifications are made at this time.

#### However ####

-Any input to improve my coding would be GREATLY appreciated. I am not opposed to the files being pulled for the sake of modifying and using as an example to teach/explain alt. methods, better practice, etc. Again I would ask they not be pushed to the repo to modify the initial document, but instead be sent to me an some alt. way.

--Thank you for taking the time to look over this 'README' file--



