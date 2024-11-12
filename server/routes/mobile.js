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

router.use(bodyParser.json());

router.get('/', async(req, res) => {
    if (!req.useragent.isMobile) {
        return res.redirect('/');
    }
    if(req.query.usrnm === undefined) {
        return res.redirect('/mobile/login');
    }else{
        try{
            const query = { usrid: req.query.usrid };
            const existingUser = await Usrnm.findOne(query).exec();
            if(existingUser){
                const username = existingUser.usrnm;
                return res.render('mobile/index', { title: 'Lires', usrnm: username });
            }else{
                return res.redirect('/mobile/login');
            }
        }catch(err){
            console.error(err);
            return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
        }
    }
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

    res.render('mobile/recipemobile', { title: 'Lires', usrnm: req.query.usrnm, rec: JSON.stringify(rec)});
});

router.get('/login', (req, res) => {
    islogin = req.query.islogin;
    message = req.query.message;
    res.render('mobile/login', { title: 'Lires', usrnm: 'Nicht eingeloggt', islogin: islogin, message: message});
});

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const permstring = req.body.permstring;
    const permstringPermision = 's4l4m4nderBrei';

    if (permstring === permstringPermision) {
        try {
            const existingUser = await Usrnm.findOne({ usrnm: username }).exec();
            if (existingUser) {
                return res.redirect('/mobile/login?message=Benutzername bereits vergeben.&islogin=false');
            } else {
                await insertUsr({ usrnm: username });
                return res.redirect('/mobile/verify/?usrnm=' + username);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
        }
    } else {
        return res.redirect('/mobile/login?message=Keine Berechtigung.&islogin=false');
    }
});

router.get('/verify', async (req, res) => {
    try {
        const username = req.query.usrnm;
        const query = { usrnm: username };
        const existingUser = await Usrnm.findOne(query).exec();
        if (existingUser) {
            const id = existingUser.usrid;
            return res.redirect('/mobile/?usrid=' + id + '&usrnm=' + username);
        } else {
            return res.redirect('/mobile/login?message=Benutzer nicht gefunden.&islogin=true');
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
            return res.redirect('/mobile/login?message=Benutzer nicht gefunden.&islogin=true');
        }
        
        const id = existingUser.usrid;
        return res.redirect('/mobile/?usrid=' + id + '&usrnm=' + username);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
});

module.exports = router;