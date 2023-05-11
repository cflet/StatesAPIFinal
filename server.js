require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

//Cors Options 
app.use(cors());

//built-in middleware to handle urlencoded data
//in other words, form data; to get form params
//'content-type: application/x-www-form-urlencoded'
//.use is traditionally used to apply middleware
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//built-in serve static files like css, images
app.use('/', express.static(path.join(__dirname, '/public')));


//routes
app.use('/', require('./routes/root'));
//router for subdir
app.use('/states', require('./routes/api/states'));


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


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

