const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type : String , unique : true, required : true, dropDups: true },
    password: String,
    watchlist: [Number],
});

module.exports = mongoose.model('Users', UserSchema);
