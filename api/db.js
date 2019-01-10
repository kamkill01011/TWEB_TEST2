const mongoose = require('mongoose');
const { dbURI } = require('./config');

mongoose.connect(dbURI).then(() => {
    // console.log('connected to DB');
});

require('./models/Movie');
