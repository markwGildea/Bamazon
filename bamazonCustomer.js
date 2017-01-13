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
    console.log('These are the rows ', rows);
    inquirer.prompt({
        name: "items",
        type: "rawlist",
        message: "Would you like to buy an item from Bamazon? [YES] or [NO]",
        choices: ["YES", "NO"]
    }).then(function(answer) {
        if (answer.items.toUpperCase() === "YES") {
            buy();
        } else {
            console.log("Thanks for shopping! Goodbye :)");
        }
    });
};

var buy = function() {
  connection.query('SELECT * FROM products', function (err, rows, fields) {
  	if (err) throw err;
  });
  inquirer.prompt([{
    name: "item",
    type: "input",
    message: "What is the ID of the product they would like to buy?"
  }, {
    name: "category",
    type: "input",
    message: "How many units of the product would you like to buy?"
  }]).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "bought",
                        type: "input",
                        message: "Thanks for shopping with us! Have a good day!"
                    }).then(function(answer) {
                        if (chosenItem.product_name < parseInt(answer.bought)) {
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                product_name: answer.bought
                            }, {
                                id: chosenItem.id
                            }], function(err, res) {
                                console.log("Your order was successfully submitted!");
                                start();
                            });
                        } else {
                            console.log("Please choose another product");
                            start();
                        }
                    });
                }
            }
        });
};
// start();


// var start = function(rows) {
//     console.log('These are the rows ', rows);
//     inquirer.prompt({
//         name: "items",
//         type: "rawlist",
//         message: "Would you like to [Buy] or [RETURN] item(s)?",
//         choices: ["BUY", "RETURN"]
//     }).then(function(answer) {
//         if (answer.items.toUpperCase() === "BUY") {
//             firstOption();
//         } else {
//             secondOption();
//         }
//     });
// };

// var firstOption = function() {
//     inquirer.prompt([{
//         name: "item",
//         type: "input",
//         message: "What is the ID of the product they would like to buy?"
//     }, {
//         name: "category",
//         type: "input",
//         message: "How many units of the product would you like to buy?"
//     }, {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//             if (isNaN(value) === false) {
//                 return true;
//             }
//             return false;
//         }
//     }]).then(function(answer) {
//         connection.query("INSERT INTO auctions SET ?", {
//             item_name: answer.item,
//             category: answer.category,
//             starting_bid: answer.startingBid,
//             product_name: answer.startingBid
//         }, function(err, res) {
//             console.log("Your auction was created successfully!");
//             start();
//         });
//     });
// };
