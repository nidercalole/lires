const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usrnm = require('../models/usrnm');

function insertUsr(data) {
    const usrnm = new Usrnm(data);
    usrnm.save()
        .then(() => {
            console.log('Usrnm saved');
            return true;
        })
        .catch((err) => {
            console.log('Error:', err);
            return false;
        });
}

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async(req, res) => {
    if(req.query.usrnm === undefined) {
        return res.redirect('/login');
    }else{
        try{
            const query = { usrid: req.query.usrid };
            const existingUser = await Usrnm.findOne(query).exec();
            if(existingUser){
                const username = existingUser.usrnm;
                return res.render('index', { title: 'Lires', usrnm: username });
            }else{
                return res.redirect('/login');
            }
        }catch(err){
            console.error(err);
            return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
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
            return res.status(404).send('Benutzer nicht gefunden.');
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
            console.log('User not found');
            return res.redirect('/login?message=Benutzer nicht gefunden.&islogin=true');
        }
        
        const id = existingUser.usrid;
        return res.redirect('/?usrid=' + id + '&usrnm=' + username);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
});

module.exports = router;