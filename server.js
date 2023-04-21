require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

//connect to MongoDB
connectDB();


//custom middleware
app.use(logger);


app.use(cors(corsOptions));


//built-in middleware to handle urlencoded data
//in other words, form data; to get form params
//'content-type: application/x-www-form-urlencoded'
//.use is traditionally used to apply middleware
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//built-in serve static files like css, images
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/public')));



//routes
app.use('/', require('./routes/root'));
//router for subdir
app.use('/register', require('./routes/register'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

// app.get('^/$|/index(.html)?', (req, res) => {
//     //res.send('Hello Cheron');
//     //res.sendFile('/views/index.html', { root: __dirname });
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get('/new-page(.html)?', (req, res) => {
//     //res.send('Hello Cheron');
//     //res.sendFile('/views/index.html', { root: __dirname });
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301, '/new-page.html'); //send 302 by default
// });

//Route Handler
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to reach hello.html page');
//     next();
// }, (req, res) => {
//     res.send('Hello World end');
// });


//chaining route handlers also middleware
//three types: built-in, custom, 3rd party
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }

// const three = (req, res) => {
//     console.log('three');
//     res.send('All done');
// }

// app.get('/chain(.html)?', [one, two, three]);



//catch all
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //set status since 404 page will be found
// });

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html')); //set status since 404 page will be found
    } else if (req.accepts('json')) {
        res.json({ error: "404 not found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

