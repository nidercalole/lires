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
        res.render('verifyrecsings', { title: 'Lires', usrnm: req.query.usrnm, data:unverify});
    } else {
        return res.redirect('/login?message=Keine Berechtigung.&islogin=true');
    }
});

router.post('/verifyIngredient', async(req, res) => {
    const send = req.body.send;
    const recid = req.body.recid;

    if (send === 'true') {
        const {labels,ingnameold,ingname,ingextra} = req.body;
        try {
            const recipe = await Rec.findOne({ recid });
            if (!recipe) {
                console.log('Recipe not found');
                return;
            }
            const verifyDoc = await Verify.findById(idVerifys).exec();
            if (!verifyDoc) {
                console.log('Verify document not found');
                return;
            }

            const unverifyDoc = await Unverify.findById(idUnverifys).exec();
            if (!unverifyDoc) {
                console.log('Unverify document not found');
                return;
            }

            verifyDoc.ings.push({name:ingname,labels:labels});
            unverifyDoc.ings = unverifyDoc.ings.filter(ing => ing.ingredient !== ingnameold);
            
            await verifyDoc.save();
            await unverifyDoc.save();

            const ingredientIndex = recipe.ingredients.findIndex(ing => ing.ing === ingnameold);
            if (ingredientIndex === -1) {
              console.log('Ingredient not found in recipe');
              return;
            }

            recipe.ingredients[ingredientIndex].ing = ingname;
            recipe.ingredients[ingredientIndex].ingextra = ingextra;
        
            const update = {
              $set: {
                [`ingredients.${ingredientIndex}.ing`]: ingname,
                [`ingredients.${ingredientIndex}.ingextra`]: ingextra
              }
            };
        
            const updatedRecipe = await Rec.findOneAndUpdate(
              { recid },
              update,
              { new: true } 
            );
        
            if (!updatedRecipe) {
              console.log('Error: Recipe not updated');
              return;
            }
            res.redirect('/addrec/verify?usrid=' + req.body.usrid + '&usrnm=' + req.body.usrnm);
            //console.log('done');
        } catch (error) {
            console.error('Error updating ingredient:', error);
        }
    }else{
        const ing = req.body.ingredient;
        res.render('verifyings', { title: 'Lires', usrnm: req.body.usrnm, data:{recid:recid,ingredient:ing}, usrid: req.body.usrid});
        
    }
});

router.post('/rejectIngredient', async(req, res) => {
    const {ingnameold,recid} = req.body;
    try {
        const unverifyDoc = await Unverify.findById(idUnverifys).exec();
        if (!unverifyDoc) {
          console.log('Unverify document not found');
          return;
        }
    
        unverifyDoc.ings = unverifyDoc.ings.filter(ing => !(ing.recid === recid && ing.ingredient === ingnameold));
        await unverifyDoc.save();
        return res.redirect('back');
      } catch (error) {
        console.error('Error removing from Unverify document:', error);
      }
});

router.post('/verifyRecipe', async (req, res) => {
    const send = req.body.send;
    const recid = req.body.recid;

    if (send === 'true') {
        try {
            const recipe = await Rec.findOne({ recid });
            if (!recipe) {
                console.log('Recipe not found');
                return;
            }
            const verifyDoc = await Verify.findById(idVerifys).exec();
            if (!verifyDoc) {
                console.log('Verify document not found');
                return;
            }

            const unverifyDoc = await Unverify.findById(idUnverifys).exec();
            if (!unverifyDoc) {
                console.log('Unverify document not found');
                return;
            }

            verifyDoc.recs.push({recid:recid});
            unverifyDoc.recs = unverifyDoc.recs.filter(rec => rec.recid !== recid);
            
            await verifyDoc.save();
            await unverifyDoc.save();

            res.redirect('/addrec/verify?usrid=' + req.body.usrid + '&usrnm=' + req.body.usrnm);
            //console.log('done');
          } catch (error) {
            console.error('Error updating ingredient:', error);
        }
    }else{
        var rec
        try {
            rec = await Rec.findOne({ recid });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
        }
        res.render('verifyrecs', { title: 'Lires', usrnm: req.body.usrnm, usrid: req.body.usrid, data:{recid:recid}, rec: JSON.stringify(rec), marked:JSON.stringify(false)});
    }
});
router.post('/rejectRecipe', async(req, res) => {
    const {recid} = req.body;
    try {
        const unverifyDoc = await Unverify.findById(idUnverifys).exec();
        if (!unverifyDoc) {
          console.log('Unverify document not found');
          return;
        }
        unverifyDoc.recs = unverifyDoc.recs.filter(rec => rec.recid !== recid);
        await unverifyDoc.save();
        return res.redirect('back');

    } catch (error) {
        console.error('Error removing from Unverify document:', error);
    }
});


module.exports = router;