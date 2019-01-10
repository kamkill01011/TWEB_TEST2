require('dotenv/config');
const express = require('express');
const passport = require('passport');
const { port } = require('./config');
const api = require('./routes/api');
const auth = require('./routes/auth');

require('./db');

const app = express();


app.use(express.json());
app.use(passport.initialize());

app.use('/api', api);
app.use('/auth', auth);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('ERROR');
});

app.listen(port, () => {
    console.log(`server run at: http://localhost:${port}`);
});
