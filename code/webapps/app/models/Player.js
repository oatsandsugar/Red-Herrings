// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model

var PlayerSchema= new mongoose.Schema({

  "PlayerID": {type : Number, default: 0},
    "PlayerName": {type : String, default: ''},
    "PlayerTrueName": {type : String, default: ''},
    "League": {type : String, default: ''},
    "TeamName3": {type : String, default: ''},
    "Year": {type : String, default: ''},
    "Position": {type : Number, default: 0},
    "Comment": {type : String, default: ''},
    "StartDate": {type : String, default: ''},
    "EndDate": {type : String, default: ''}
}, { strict: false })
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Players',PlayerSchema,'Players' );