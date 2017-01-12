var sql = require('mysql');

var inquire = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "mgof5562",
    database: "Bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	runSearch();
});

var runSearch = function () {
	inquirer.prompt({

	});
};

