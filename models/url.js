var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Counter schema
var CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

var counters = mongoose.model('counters', CounterSchema);

// URL List schema
var urlSchema = new Schema({
    id: { type: Number, default: 0 },
    url: String
});

urlSchema.pre('save', function(next){
    var document = this;
    counters.findByIdAndUpdate({_id: 'urlid'}, {$inc: {seq: 1}}, {new: true, upsert: true}, function(err,counters){
        if (err) {
            return next(err);
        }
        document.id = counters.seq;
        next();
    });
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;