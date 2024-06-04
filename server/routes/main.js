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

router.post('/register', (req, res) => {
    const username = req.body.username;
    const permstring = req.body.permstring;
    const permstringPermision = 's4l4m4nderBrei'
    if(permstring === permstringPermision){
        console.log('Permission granted');
        if(insertUsr({ usrnm: username })) {
        res.redirect('/?usrnm=' + username);
        }
    }else{
        console.log('Permission denied');
        res.redirect('/login');
    }
    console.log('Username:', username);

    res.redirect('/login');
});
module.exports = router;