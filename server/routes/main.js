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

function findUsr(query) {
    Usrnm.find(query)
        .then((usrnms) => {
            console.log('Usrnm found:', usrnms);
        })
        .catch((err) => {
            console.log('Error:', err);
        })
}

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('index', { title: 'Lires', usrnm: req.query.usrnm });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Lires', usrnm: 'Nicht eingeloggt' });
});

router.get('/addres', (req, res) => {
    res.render('addres', { title: 'Lires', usrnm: req.query.usrnm });
});

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const permstring = req.body.permstring;
    const permstringPermision = 's4l4m4nderBrei'
    if(permstring === permstringPermision){
        console.log('Permission granted');
        try {
            const existingUser =  await Usrnm.findOne({usrnm: username}).exec();
            console.log('Existing user:', existingUser);
            if(existingUser){
                console.log('User already exists');
                res.redirect('/login');
            }else{
                insertUsr({usrnm: username});
                res.redirect('/verify/?usrnm=' + username);
            }
        }catch (err) {
            console.error(err);
            res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
        }
        
    }else{
        console.log('Permission denied');
        res.redirect('/login');
    }
    console.log('Username:', username);

    res.redirect('/login');
});

router.get('/verify', async (req, res) => {
    try {
        const username = req.query.usrnm;
        const query = {usrnm: username};
        const existingUser = await Usrnm.findOne(query).exec();
        const id = existingUser.usrid;
        res.redirect('/?usrid=' + id + '&usrnm=' + username);
    }catch (err) {
        console.error(err);
        res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
});

router.post('/anmld' , async (req, res) => {
    try {
        const username = req.body.username;
        const query = {usrnm: username};
        const existingUser = await Usrnm.findOne(query).exec();
        if(!existingUser){
            console.log('User not found');
            res.redirect('/login');
        }
        const id = existingUser.usrid;
        res.redirect('/?usrid=' + id + '&usrnm=' + username);
    }catch (err) {
        console.error(err);
        res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
});

module.exports = router;