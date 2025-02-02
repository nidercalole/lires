const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const chefkoch = require('../../custom_modules/chefkoch');
const usrnm = require('../models/usrnm');
const userCreds = require('../models/usercreds');
const { recompileSchema } = require('../models/unverify');
const nodemailer = require('nodemailer');

function insertUsr(data) {
    const usrnm = new Usrnm(data);
    usrnm.save()
        .then(() => {
            const usid = usrnm.usrid;
            const userCred = new userCreds({
                user: usid,
                reccreated: [],
                recmarked: []
            });
            userCred.save()
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    console.log('Error:', err);
                });
            return true;
        })
        .catch((err) => {
            console.log('Error:', err);
            return false;
        });
}

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async(req, res) => {
  
    if(req.useragent.isMobile) {
        return res.redirect('/mobile');
    }else{
        if(req.query.usrnm === undefined) {
            return res.redirect('/login');
        }else{
            try{
                const query = { usrid: req.query.usrid };
                const searchRecs = req.query.filtertRecs;
                const existingUser = await Usrnm.findOne(query).exec();
                var recs = [];
                recs = await Rec.find({}).exec();
                recs.sort((a, b) => new Date(b.ts) - new Date(a.ts));
                var newestRecs = recs.slice(0, 5);
                let recrToSend = [];
                if(searchRecs === undefined || searchRecs === null || searchRecs === 'undefined' || searchRecs === 'null'){
                    recrToSend = newestRecs;
                }else{
                    recrToSend = [JSON.parse(searchRecs)];
                }
                if(existingUser){
                    const username = existingUser.usrnm;
                    return res.render('index', { title: 'Lires', usrnm: username, recs: recrToSend});
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
            const existingUser = await Usrnm.findOne({ usrnm: username  }).exec();
            if (existingUser) {
                return res.redirect('/login?message=Benutzername bereits vergeben.&islogin=false');
            } else {
                await insertUsr({ usrnm: username, usrid: (Math.random().toString(36).substring(2)) })
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
    const usrid = req.query.usrid;
    try {
        const query = { recid: recid };
        rec = await Rec.findOne(query).exec();
        var marked = await userCreds.findOne({user: usrid}).exec();
        if(marked){
            if(marked.recmarked.includes(recid)){
                marked = true;
            }else{
                marked = false;
            }
        }else{
            marked = false;
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Fehler bei der Verarbeitung der Anfrage.');
    }
    res.render('recipe', { title: 'Lires', usrnm: req.query.usrnm, rec: JSON.stringify(rec), marked: marked });
});

router.get('/profile', async (req, res) => {
    const selfRecs = await Rec.find({"user.1": req.query.usertosee}).exec()
    res.render('profile', { title: 'Lires', usrnm: req.query.usrnm, selfRecs: JSON.stringify(selfRecs)});
});

router.get('/getRecChefkoch', (req, res) => {
    chefkoch.chefkochAPI.getRecipe(req.query.link)
    .then(function(data){
        res.json(data);
    });
}); 
router.post('/search', async (req, res) => {
    const { zubDauer, zutEx, zutIn, prEx, prIn, zubEx, recTitle } = req.body
    var recs = await Rec.find({}).exec();
    var recsPrefer 
    if (recTitle) {
        recsPrefer = recs.find(rec => rec.recname.toLowerCase().includes(recTitle.toLowerCase())) || null;
    }

    return res.json(recsPrefer);

});
router.get('/allrecs', async (req, res) => {
    var recs = await Rec.find({}).exec();
    
    res.render('allrecs', { title: 'Lires', usrnm: req.query.usrnm, recs: recs});
})
/*
router.get('/testapi', (req, res) => {
    chefkoch.chefkochAPI.getRecipe('/rezepte/923031197646622/Quarkbaellchen.html')
    .then(function(data){
        res.render('testapi', { title: 'Lires', data: JSON.stringify(data), usrnm: req.query.usrnm }); 
    });
});
*/

router.get('/recList', async (req, res) => {
    const { recfilter, showText } = req.query;
    const recs = await Rec.find({}).exec();
    const filteredRecs = recs.filter(rec => 
        Array.isArray(rec.kindodish) &&
        rec.kindodish.some(dish => dish.toLowerCase() === recfilter?.toLowerCase())
    );

    res.render('recList', { title: 'Lires', usrnm: req.query.usrnm, recs: filteredRecs, showText: showText });
});

router.get('/reportAny', (req, res) => {
    res.render('report', { title: 'Lires', usrnm: req.query.usrnm });
});
router.get('/editFriend', (req, res) => {
    res.render('friendsonly', { title: 'Lires', usrnm: req.query.usrnm });
});
router.get('/editCalenderAny', (req, res) => {
    res.render('calednderedit', { title: 'Lires', usrnm: req.query.usrnm });
});
router.get('/editList', (req, res) => {
    res.render('listsonly', { title: 'Lires', usrnm: req.query.usrnm });
});
router.post('/saveMarker', async (req, res) => {
    const { recid, usrid } = req.body;
    const query = { usrid: usrid };
    const query2 = { user: usrid };
    const existingUser = await usrnm.findOne(query).exec();
    const existingExtras = await userCreds.findOne(query2).exec();
    if(existingUser == null) return res.redirect('/login?message=Benutzer nicht gefunden.&islogin=true');
    else if(existingUser != null && existingExtras == null) {
        const userCred = new userCreds({
            user: usrid,
            recmarked: [recid]
        });
        userCred.save()
            .then(() => {
                return res.json({ message: 'UserCredetials erstellt.' });
            })
            .catch((err) => {
                console.log('Error:', err);
                return res.json({ message: false });
            });
    }else if(existingUser != null && existingExtras != null){
            if(existingExtras.recmarked.includes(recid)){
                existingExtras.recmarked = existingExtras.recmarked.filter(rec => rec !== recid);
            }else{
                existingExtras.recmarked.push(recid);
            }
            existingExtras.save()
            .then(() => {
                return res.json({ message: true });
            })
            .catch((err) => {
                console.log('Error:', err);
                return res.json({ message: false });
            });

    }
});
router.post('/sendReport', async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "nidercalole@gmail.com",
          pass: process.env.GOOGLE, 
        },
    });
    const mailOptions = {
        from: `${req.body.user} <nidercalole@gmail.com>`,
        to: 'team@lires.de',
        replyTo: `${req.body.email}`,
        subject: 'Report',
        text: 'Report sent from lires.de',
        html: `<h1>Report sent from lires.de</h1><p>${req.body.message}</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.render('report', { title: 'Lires', usrnm: req.body.user, message: false });
        }
        console.log('Message sent: %s', info.messageId);
        const parts  = req.body.user.split(' ');
        console.log('/?usrnm=' + parts[0] + '&usrid=' + parts[1] + '&message=true');
        return res.redirect('/?usrnm=' + parts[0] + '&usrid=' + parts[1] + '&message=true');
    });

});


module.exports = router;