const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('mobile/index', { title: 'Lires', usrnm: req.query.usrnm });
});

module.exports = router;