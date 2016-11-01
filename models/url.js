var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var urlSchema = new Schema({
    original_url: {type: String, required: true, unique: true},
    short_url: {type: String, required: true, unique: true}
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;