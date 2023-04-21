const express = require('express');
const router = express.Router();
const path = require('path');

//built-in serve static files like css, images
//router.use(express.static(path.join(__dirname, '..', '/public')));


router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});




module.exports = router;