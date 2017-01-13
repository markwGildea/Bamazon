var mysql = require('mysql');

var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //my username
    user: "root",

    //my password
    password: "mgof5562",
    database: "Bamazon"
});

function getAllProducts(startCallback) {



connection.query('SELECT * FROM products', function(err, rows, fields) {
  if (err) throw err;
  startCallback(rows);

});

}
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
    getAllProducts(start);
});

var start = function(rows) {
	console.log('This is the rows ', rows);
    inquirer.prompt({
        name: "items",
        type: "rawlist",
        message: "Would you like to buy [ITEMS] or [RETURN] them?",
        choices: ["ITEMS", "RETURN"]
    }).then(function(answer) {
        if (answer.items.toUpperCase() === "ITEMS") {
            firstOption();
        } else {
            secondOption();
        }
    });
};

var firstOption= function() {
  inquirer.prompt([{
    name: "item",
    type: "input",
    message: "What is the ID of the product they would like to buy?"
  }, {
    name: "category",
    type: "input",
    message: "How many units of the product would you like to buy?"
  }, {
    name: "startingBid",
    type: "input",
    message: "What would you like your starting bid to be?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    connection.query("INSERT INTO auctions SET ?", {
      item_name: answer.item,
      category: answer.category,
      starting_bid: answer.startingBid,
      highest_bid: answer.startingBid
    }, function(err, res) {
      console.log("Your auction was created successfully!");
      start();
    });
  });
};

