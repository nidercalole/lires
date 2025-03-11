const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const Unverify = require('../models/unverify');
const Verify = require('../models/verify');
const idUnverifys = '6667388c04a3ed7a5539fb55';
const idVerifys = '66673a48df82133513053caa';
const natural = require('natural');
const stemmer = natural.PorterStemmer;

router.use(bodyParser.json());

const emptyRecDeafult = {
  recid: '0',
  recname: 'Kein Rezept nicht gefunden',
  kindodish: ['Unbekannt'],
  ingredients: ['Unbekannt'],
  instructions: ['Unbekannt'],
  ts: new Date().toISOString
};

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
function text(rec){
  let recText = '';
  if(rec.directions[0].steppwise){
    recText = rec.directions.map(item => item.step).join(' ');
  }else{
    recText = rec.directions[1];
  }
  return recText;
}
function filterRecsbyProcess(recs, prEx, prIn){
  let returnRecs = [];
  let recDirectionText = '';
  if(prEx.length === 0 && prIn.length === 0){
    return recs;
  }else if(prEx.length === 0){
    prIn.forEach(pr => {
      var stemmedProcess = stemmer.stem(pr);
      //console.log('stemmedProcess: ' + stemmedProcess);
      recs.forEach(rec => {
        recDirectionText = text(rec);
        if(recDirectionText.split(/\W+/).some(word => stemmer.stem(word) === stemmedProcess)){
          returnRecs.push(rec);
        }
      });
    });
    return returnRecs;
  }else{
    prEx.forEach(pr =>{
      var stemmedProcess = stemmer.stem(pr);
      recs.forEach(rec => {
        recDirectionText = text(rec);
        if(!(recDirectionText.split(/\W+/).some(word => stemmer.stem(word) === stemmedProcess))){
          returnRecs.push(rec);
        }
      });
    })
    return returnRecs;
  }
}
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
        
        if(zutEx.length === 0 && zutIn.length === 0 && prEx.length === 0 && prIn.length === 0 && maxDauer === 100000000){
            return res.json({ success: true, message: 'noFilterRequest' });
        }else if((zutEx.length != 0 && zutIn.length != 0)||(prEx.length != 0 && prIn.length != 0) ){
            return res.json({ success: true, message: 'randomFilterRequest' });
        }else if(zutEx.length >= 6 || zutIn.length >= 6 || prEx.length >= 6 || prIn.length >= 6 || (zutEx.length + zutIn.length + prEx.length + prIn.length) >= 7){
            return res.json({ success: true, message: 'tooManyFilterRequest' });
        }else if(zutEx.length === 0 && zutIn.length === 0 && prEx.length === 0 && prIn.length === 0 && maxDauer != 0){
          await Rec.find({ duration: { $lte: maxDauer } }).exec().then((recs) => {
            req.session.filteredRecs = recs;
            req.session.filterText = 'Filterergebnisse';
            res.json({ success: true, message: 'validFilterRequest' });
          });
          return;
        }else {
          if(zutIn.length === 0){
            //console.log('zutEx: ' + JSON.stringify(zutEx));
            await Rec.find({
              ingredients: {
                $not: {
                  $elemMatch: {
                    ing: { 
                      $in: zutEx.map(zut => new RegExp(zut, 'i')) // Prüft, ob eines der zutEx in 'ing' vorhanden ist
                    }
                  }
                }
              },
              duration: { $lte: maxDauer }
            }).exec().then((recs) => {
              const recsFinal = filterRecsbyProcess(recs, prEx, prIn);
              req.session.filteredRecs = recsFinal;
              req.session.filterText = 'Filterergebnisse';
              if(recsFinal.length === 0){
                req.session.filteredRecs = [emptyRecDeafult];
                return res.json({ success: true, message: 'noResults' });
              }
              res.json({ success: true, message: 'validFilterRequest' });
            });
          }else {
            //console.log('zutIn: ' + JSON.stringify(zutIn)); 
            await Rec.find({
              ingredients: { $elemMatch: { ing: {  $in: zutIn.map(zut => new RegExp(zut, 'i')) } } },
              duration: { $lte: maxDauer }
            }).exec().then((recs) => {
              const recsFinal = filterRecsbyProcess(recs, prEx, prIn);

              req.session.filteredRecs = recsFinal;
              req.session.filterText = 'Filterergebnisse';
              if(recsFinal.length === 0){
                req.session.filteredRecs = [emptyRecDeafult];
                return res.json({ success: true, message: 'noResults' });
              }
              res.json({ success: true, message: 'validFilterRequest' });
            });
          }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

router.use('/verify' , require('./verifyrecsings'));

module.exports = router;