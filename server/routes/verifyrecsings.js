const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const Unverify = require('../models/unverify');
const Verify = require('../models/verify');
const idUnverifys = '6667388c04a3ed7a5539fb55';
const idVerifys = '66673a48df82133513053caa';

router.use(bodyParser.json());

router.get('/', async(req, res) => {
    if(req.useragent.isMobile) {
        return res.redirect('/mobile/notsupported');
    }
    const userid = req.query.usrid;
    if (userid === '6k31a7cdbga' || userid === 'l725iqftr0l') {
        const unverify = await Unverify.findById(idUnverifys).exec();
        console.log(unverify);
        res.render('verifyrecsings', { title: 'Lires', usrnm: req.query.usrnm, data:unverify});
    } else {
        return res.redirect('/login?message=Keine Berechtigung.&islogin=true');
    }
});

router.post('/verifyIngredient', async(req, res) => {
    const send = req.body.send;
    const recid = req.body.recid;
    const ing = req.body.ingredient;
    console.log(recid, ing, send);
    if (send === 'true') {
        
    }else{
        res.render('verifyings', { title: 'Lires', usrnm: req.query.usrnm, data:{recid:recid,ingredient:ing}});
    }

});

module.exports = router;