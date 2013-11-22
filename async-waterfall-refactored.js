async = require('async');

var func1 = function(callback) {
	callback(null, [1]);
};

func2 = function(list, callback) {
	console.log(list);
	list.push(2)
	callback(null, list);
};

func3 = function(list, callback) {
	console.log(list);
	list.push(3)
	callback(null, list);
};

finalFunc = function(err, list) {
			console.log('Final list: ' + list);
		};

async.waterfall([
	func1,
	func2,
	func3], 
	finalFunc);


