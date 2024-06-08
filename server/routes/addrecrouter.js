const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('addrec', { title: 'Lires', usrnm: req.query.usrnm });
});

router.post('/add', async(req, res) => {
    try {
        const { recname, user, expense, duration, description, countfor, kindodish, labels, ingredients, directions } = req.body;
        const usrid = (await Usrnm.findOne({usrnm: user}).exec()).usrid;
        const rec = new Rec({ recname, user: [user, usrid], expense, duration, description, countfor, kindodish, labels, ingredients, directions });
        rec.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});
module.exports = router;