const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const user = require('./api/user');
const stocks = require('./api/stocks');

const app = express(); 

app.use(bodyParser.json());

// get mongoDB login & connect
const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(() => console.log("mongoDBconnected")).catch(err => console.log(err));

// Middleware
app.use('/api/user', user);
app.use('/api/stocks', stocks);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder

    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
