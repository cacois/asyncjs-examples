async = require('async');

async.series([
	function(callback) {
		result1 = 1;
		setTimeout(function() {
			console.log('Adding ' + result1);
			callback(null, result1);
		}, 3000);
	},
	function(callback) {
		result2 = 2;
		console.log('Adding ' + result2);
		callback(null, result2);
	},
	function(callback) {
		result3 = 3;
		console.log('Adding ' + result3);
		callback(null, result3);
	}], function(err, list){
		console.log('Final list: ' + list);
	});

