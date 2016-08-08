var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema({
	sid: String,
	joinId: String,
	createdAt: Date,
    ipAddress: String
});

schema.plugin(mongoosePaginate);
var game = mongoose.model('t_game', schema);
module.exports = game;
