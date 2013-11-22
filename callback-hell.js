// adapted from callbackhell.com
var fs = require('fs'),
mongo = require('mongojs'),
_ = require('underscore');

var source = './';

var db = mongo('asyncdb', ['async']);

fs.readdir(source, function(err, files) {
  var fullFiles = [];
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function(filename, fileIndex) {
      console.log('Found local file: ' + filename);
      db.async.find({'file': filename}, function(err, files){
        console.log('Found db file: ' + JSON.stringify(files));
        if(files.length == 0) { // no files found
          db.async.insert({file: filename}, function(err){
            if (err) {
              console.log('Error inserting file info db: ' + err)
            } else {
              console.log('Inserted file ' + filename + ' into db');
            }
          });
        }
      })
    });
  }
  // print all files
  db.async.find().sort({file:1}, function(err, files){
    console.log('Full list of found files:');
    _.each(files, function(file) {
      console.log('\t' + file.file);
    });
  });
});