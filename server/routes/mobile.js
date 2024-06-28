const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());

router.get('/', (req, res) => {
    if (!req.useragent.isMobile) {
        return res.redirect('/');
    }
    res.render('mobile/index', { title: 'Lires', usrnm: req.query.usrnm });
});

router.get('/lists', (req, res) => {
    res.render('mobile/lists', { title: 'Lires', usrnm: req.query.usrnm });
});

router.get('/notsupported', (req, res) => {
    res.render('mobile/notsupported', { title: 'Lires', usrnm: req.query.usrnm });
});

router.get('/addrec', (req, res) => {
    res.render('mobile/addrec', { title: 'Lires', usrnm: req.query.usrnm });
});
router.get('/recipe', (req, res) => {
    res.render('mobile/recipemobile', { title: 'Lires', usrnm: req.query.usrnm });
});
module.exports = router;