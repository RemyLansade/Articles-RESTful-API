const bodyParser = require('body-parser');
const express    = require('express');
const mongoose   = require('mongoose');
const path       = require('path');

const articles   = require('./routes/articles');

const app  = express();
const port = 3000;


// MongoDB Setup
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});


// Middleware
app.use(bodyParser.urlencoded({extended: true}));


// API Routes
app.use('/articles', articles);


// Server port
app.listen(port, () => {
    console.log(`Server running on: localhost:${port}`);
});