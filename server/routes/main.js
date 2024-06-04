const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Lires', usrnm: req.query.usrnm });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Lires', usrnm: 'Nicht eingeloggt' });
});

module.exports = router;