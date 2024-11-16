const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const Unverify = require('../models/unverify');
const Verify = require('../models/verify');
const idUnverifys = '6667388c04a3ed7a5539fb55';
const idVerifys = '66673a48df82133513053caa';
const List = require('../models/list');

router.use(bodyParser.json());

router.post('/', async(req, res) => {
    try {
        const { ingList, selectedLists } = req.body;
        console.log(ingList, selectedLists);
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});





module.exports = router;