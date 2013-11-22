async = require('async');

async.waterfall([
	function(callback) {
		callback(null, [1]);
	},
	function(list, callback) {
		console.log(list);
		list.push(2)
		callback(null, list);
	},
	function(list, callback) {
		console.log(list);
		list.push(3)
		callback(null, list);
	}], function(err, list){
		console.log('Final list: ' + list);
	});


