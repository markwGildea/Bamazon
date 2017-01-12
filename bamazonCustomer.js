var mysql = require('mysql');

var inquirer = require('inquirer');


// Lets start our server
// server.listen(PORT, function() {
//   // Callback triggered when server is successfully listening. Hurray!
//   console.log("Server listening on: http:localhost:%s", PORT);
// });


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //my username
    user: "root",

    //my password
    password: "mgof5562",
    database: "Bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
    console.log("connected as id: " + connection.threadId);
});

var runSearch = function () {
	inquirer.prompt({

	});
};

