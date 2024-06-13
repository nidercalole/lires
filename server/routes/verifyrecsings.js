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

        } catch (error) {
            console.error('Error updating ingredient:', error);
        }
    }else{
        const ing = req.body.ingredient;
        res.render('verifyings', { title: 'Lires', usrnm: req.query.usrnm, data:{recid:recid,ingredient:ing}});
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
        
      } catch (error) {
        console.error('Error removing from Unverify document:', error);
      }
});

module.exports = router;