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
        const recid = Math.random().toString(36).substring(2);
        const usrid = (await Usrnm.findOne({usrnm: user}).exec()).usrid;
        const rec = new Rec({ recname, user: [user, usrid], expense, duration, description, countfor, kindodish, labels, ingredients, directions, recid });
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

router.post('/filterRequest', async(req, res) => { 
    try {
        var { zubDauer, zutEx, zutIn, prEx, prIn } = req.body;

        zutEx = zutEx.map(zut => zut.trim().toLowerCase()); 
        zutIn = zutIn.map(zut => zut.trim().toLowerCase()); 
        //console.log(zubDauer, zutEx, zutIn, prEx, prIn);
        let maxDauer = 0;
        maxDauer = parseInt(zubDauer);
        if(maxDauer === 14){
          maxDauer = 100000000;
        }
        console.log('maxDauer: ' + maxDauer);
        if(zutEx.length === 0 && zutIn.length === 0 && prEx.length === 0 && prIn.length === 0 && maxDauer === 0){
            return res.json({ success: true, message: 'noFilterRequest' });
        }else if((zutEx.length != 0 && zutIn.length != 0)||(prEx.length != 0 && prIn.length != 0) ){
            return res.json({ success: true, message: 'randomFilterRequest' });
        }else if(zutEx.length >= 6 || zutIn.length >= 6 || prEx.length >= 6 || prIn.length >= 6 || (zutEx.length + zutIn.length + prEx.length + prIn.length) >= 7){
            return res.json({ success: true, message: 'tooManyFilterRequest' });
        }else if(zutEx.length === 0 && zutIn.length === 0 && prEx.length === 0 && prIn.length === 0 && maxDauer != 0){
          await Rec.find({ duration: { $lte: maxDauer } }).exec().then((recs) => {
            res.json({ success: true, recs: recs, message: 'validFilterRequest' });
          });
          return;
          //HIER LÄUFT WAS GANZ FALSCH
        }else {
          if(zutIn.length === 0){
            console.log('zutEx: ' + JSON.stringify(zutEx));
            await Rec.find({
              ingredients: { $elemMatch: { ing: { $nin: zutEx } } },
              duration: { $lte: maxDauer }
            }).exec().then((recs) => {
              res.json({ success: true, recs: recs, message: 'validFilterRequest' });
            });
            //hier noch nach process filtern
          }else {
            console.log('zutIn: ' + JSON.stringify(zutIn)); 
            await Rec.find({
              ingredients: { $elemMatch: { ing: {  $in: zutIn } } },
              duration: { $lte: maxDauer }
            }).exec().then((recs) => {
              res.json({ success: true, recs: recs, message: 'validFilterRequest' });
            });
            //hier noch nach process filtern
          }


        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

router.use('/verify' , require('./verifyrecsings'));

module.exports = router;