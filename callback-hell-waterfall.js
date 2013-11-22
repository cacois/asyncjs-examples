var fs = require('fs'),
mongo = require('mongojs'),
async = require('async'),
_ = require('underscore');

var source = './';
var db = mongo('asyncdb', ['async']);

async.waterfall(
[
	// STEP 1
	function(callback) {
		fs.readdir(source, callback);
	},
	// STEP 2: Merged steps because each() branches the flow
	function(files, callback) {
		_.each(files, function(filename, fileIndex) {
		    console.log('Found local file: ' + filename);
      		db.async.find({'file': filename}, function(err, files){
      			if(files.length == 0) { // no files found
      				db.async.insert({'file': filename}, null);
      			}
      		});
        });
		callback(null);
	},
	// STEP 3
	function(callback) {
		db.async.find().sort({file:1}, callback);
	}
],	function(err, files) {
		if(err) console.log("Error: " + err);
	    else {
	    	console.log('Full list of files:');
	    	_.each(files, function(file) {
            	console.log('\t' + file.file);
        	});
	    }
	}
);