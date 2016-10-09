// grab the mongoose module
var mongoose = require('mongoose');

var DictionarySchema= new mongoose.Schema({
  "Table Name": {type : String, default: ''},
  "Display Name": {type : String, default: ''},
  "Description": {type : String, default: ''},
  "Column Name": {type : String, default: ''},
  "Data Type": {type : String, default: ''},
  "Relevance": {type : String, default: ''}
}, { strict: false })

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Dictionary',DictionarySchema,'Dictionary' );