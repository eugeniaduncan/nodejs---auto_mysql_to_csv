
/* PROGRAM WITH SET TIME INTERVAL FOR SENDING DATABASE OUTPUT TO CSV FILE */

/* created by Eugenia Duncan */

var mysql = require('mysql');


var time_period = 1000 * 14400; //14,400 sec = 4 hrs

setInterval(function(){

var connection = mysql.createConnection({
	host: 'your_host',
	user: 'your_username',
	password: 'your_password',
	database: 'your_db',
	port: 3306
});

var table = 'your_table';

connection.connect();

var query = connection.query(

	'SELECT * FROM ' + table + '', function(err, rows){

		if(err) throw err;

		var row = [];

		var result = [];

		var text = '[';

		for (var i = 0; i < rows.length; i++)
		{
			row[i] = JSON.stringify(rows[i]);
			
			result.push(row[i]);

  			if(i == rows.length - 1) text += result[i];

			else text += result[i] + ',';
		}	

		text += ']';

		var data = JSON.parse(text);

		//Print CSV to Console
		//Note: To exclude first row of column names in output set prependHeader to false.
		var converter = require('json-2-csv');
		converter.json2csv(data, function (err, csv){
			if(err) throw err;
			console.log(csv);
		}, {prependHeader: true});

		//Note: Can use the reverse converter function, .csv-2-json(), of the json-2-csv library also.

		//Write CSV to File
		//Note: To exclude first row of column names in file set headers to false.
		var fs = require('fs');
		var ws = fs.createWriteStream('db_output.csv');
		var fastcsv = require('fast-csv');
		fastcsv.write(data, {headers: true}).pipe(ws);

		//Optionally generate a simple date log file.
		var today = new Date().toString();
		//var today = new Date().toDateString();
		//var today = new Date().toISOString().slice(0, 10);
		var writeout = require('writeout');
		writeout('data_log.txt', 'Program last run on ' + today + '.', {
		    mkdirp: true,
		    skipIfIdentical: true
		}, function (err, result) {if(err) throw err;});

		connection.end();		
	});

}, time_period);
