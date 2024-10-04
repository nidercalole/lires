const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const chefkoch = require('../../custom_modules/chefkoch');
const usrnm = require('../models/usrnm');

function insertUsr(data) {
    const usrnm = new Usrnm(data);
    usrnm.save()
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log('Error:', err);
            return false;
        });
}

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async(req, res) => {
  
    if(req.useragent.isMobile) {
        return res.redirect('/mobile');
    }else{
        if(req.query.usrnm === undefined) {
            return res.redirect('/login');
        }else{
            try{
                const query = { usrid: req.query.usrid };
                const existingUser = await Usrnm.findOne(query).exec();
                var recs = [];
                recs = await Rec.find({}).exec();
                recs.sort((a, b) => new Date(b.ts) - new Date(a.ts));
                var newestRecs = recs.slice(0, 5);
                if(existingUser){
                    const username = existingUser.usrnm;
                    return res.render('index', { title: 'Lires', usrnm: username, recs: newestRecs});
                }else{
                    return res.redirect('/login');
                }
            }catch(err){
                console.error(err);
                return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
            }
        }
    }



});

router.get('/login', (req, res) => {
    islogin = req.query.islogin;
    message = req.query.message;
    res.render('login', { title: 'Lires', usrnm: 'Nicht eingeloggt', islogin: islogin, message: message});
});

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const permstring = req.body.permstring;
    const permstringPermision = 's4l4m4nderBrei';

    if (permstring === permstringPermision) {
        try {
            const existingUser = await Usrnm.findOne({ usrnm: username }).exec();
            if (existingUser) {
                return res.redirect('/login?message=Benutzername bereits vergeben.&islogin=false');
            } else {
                await insertUsr({ usrnm: username });
                return res.redirect('/verify/?usrnm=' + username);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
        }
    } else {
        return res.redirect('/login?message=Keine Berechtigung.&islogin=false');
    }
});


router.get('/verify', async (req, res) => {
    try {
        const username = req.query.usrnm;
        const query = { usrnm: username };
        const existingUser = await Usrnm.findOne(query).exec();
        if (existingUser) {
            const id = existingUser.usrid;
            return res.redirect('/?usrid=' + id + '&usrnm=' + username);
        } else {
            return res.redirect('/login?message=Benutzer nicht gefunden.&islogin=true');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
});


router.post('/anmld', async (req, res) => {
    try {
        const username = req.body.username;
        const query = { usrnm: username };
        const existingUser = await Usrnm.findOne(query).exec();
        
        if (!existingUser) {
            return res.redirect('/login?message=Benutzer nicht gefunden.&islogin=true');
        }
        
        const id = existingUser.usrid;
        return res.redirect('/?usrid=' + id + '&usrnm=' + username);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
});

router.get('/recipe', async (req, res) => {
    var rec 
    const recid = req.query.recid;
    try {
        const query = { recid: recid };
        rec = await Rec.findOne(query).exec();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
    res.render('recipe', { title: 'Lires', usrnm: req.query.usrnm, rec: JSON.stringify(rec)});
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'Lires', usrnm: req.query.usrnm });
});

router.get('/getRecChefkoch', (req, res) => {
    chefkoch.chefkochAPI.getRecipe(req.query.link)
    .then(function(data){
        res.json(data);
    });
}); 
/*
router.get('/testapi', (req, res) => {
    chefkoch.chefkochAPI.getRecipe('/rezepte/923031197646622/Quarkbaellchen.html')
    .then(function(data){
        res.render('testapi', { title: 'Lires', data: JSON.stringify(data), usrnm: req.query.usrnm }); 
    });
});
*/

module.exports = router;