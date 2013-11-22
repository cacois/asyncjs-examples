var fs = require('fs'),
mongo = require('mongojs'),
async = require('async'),
_ = require('underscore');

var source = './';
var db = mongo('asyncdb', ['async']);

async.series(
[
	// STEP 1: Read local files, find in mongodb
	function(callback) {
		fs.readdir(source, function(err, files) {
			_.each(files, function(filename, fileIndex) {
		    	console.log('Found local file: ' + filename);
      			db.async.find({'file': filename}, function(err, files){
      				if(files.length == 0) { // no files found
        			    callback(null, filename); // send filename to final callback
			        } else callback(null);
      			});
        	});
		});
	}
],	
// FINAL: take list of files found, insert into mongodb 
// if necessary and print files in db to console
function(err, files) {
		if(err) console.log("Error: " + err);
	    else {
	    	_.each(files, function(filename, fileIndex) {
	    		// write to db
	    		db.async.insert({'file': filename}, null);
        	});
	    }
    	console.log('Full list of files:');
    	db.async.find().sort({file:1}, function(err, files) {
    		_.each(files, function(file, fileIndex) {
	           	console.log('\t' + file.file);
	        });
    	});
	}
);
