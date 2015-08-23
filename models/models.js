/**
 * Created by Christianson on 13/08/2015.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://cgruenberg:ifoundnemo@ds031903.mongolab.com:31903/craig-photography');

var schema = new mongoose.Schema({
    description: String,
    filePath: String,
    fileName: String
});

module.exports = mongoose.model('Photo', schema);