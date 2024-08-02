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

router.post('/addrecingredients', async(req, res) => {
    let useragent = 'desktop';
    if(req.useragent.isMobile) {
        useragent = 'mobile';
    }
    try {
        const { recname } = req.body;
        const rec = await Rec.findOne({ recname: recname }).exec();
        
        if (!rec) {
          return res.status(404).json({ success: false, message: 'Rezept nicht gefunden' });
        }

        const recid = rec.recid;
        const ingredients = rec.ingredients.map(ing => ing.ing);
        const verifyDoc = await Verify.findById(idVerifys).exec();
        const newIngredients = ingredients.filter(ing => !verifyDoc.ings.includes(ing)).map(ing => ({ ingredient: ing, recid: recid }));
  

        await Unverify.findByIdAndUpdate(idUnverifys, {
          $addToSet: { recs: {recid:recid,recname:recname}, ings: { $each: newIngredients } }
        }, { new: true, upsert: true });
    
        res.json({ success: true, useragent: useragent });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
      }
});


router.use('/verify' , require('./verifyrecsings'));

module.exports = router;