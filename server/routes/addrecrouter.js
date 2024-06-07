const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.render('addrec', { title: 'Lires', usrnm: req.query.usrnm });
});

module.exports = router;