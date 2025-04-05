const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const chefkoch = require('../../custom_modules/chefkoch');
const usrnm = require('../models/usrnm');
const userCreds = require('../models/usercreds');
const nodemailer = require('nodemailer');

const emptyRecDeafult = {
    recid: '0',
    recname: 'Rezept nicht gefunden',
    kindodish: ['Unbekannt'],
    ingredients: ['Unbekannt'],
    instructions: ['Unbekannt'],
    ts: new Date().toISOString
};

function insertUsr(data) {
    const usrnm = new Usrnm(data);
    usrnm.save()
        .then(() => {
            const usid = usrnm.usrid;
            const userCred = new userCreds({
                user: usid,
                reccreated: [],
                recmarked: [[], []]
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

const getNextThreeDatesWithEntries = (records, recipes) => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0); 
    const uniqueFutureDates = [...new Set(
      records
        .map(([_, date]) => new Date(date))
        .filter(date => date >= today)
        .map(date => date.toISOString().split('T')[0])
    )].sort();

    const nextThreeDates = uniqueFutureDates.slice(0, 3);
    const recipeMap = Object.fromEntries(recipes.map(recipe => [recipe.recid, recipe]));

    return nextThreeDates.map(date => {
      const formattedDate = new Date(date);
      const displayDate = `${(formattedDate.getDate()).toString().padStart(2, '0')}.${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  
      const entriesForDate = records
        .filter(([recid, recDate]) => new Date(recDate).toISOString().split('T')[0] === date)
        .map(([recid]) => recipeMap[recid] || emptyRecDeafult); // Falls ID fehlt, Standardwert setzen
  
      return [displayDate, entriesForDate];
    });
  };

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
                var filterText = "Neuste Rezepte";
                const query = { usrid: req.query.usrid };
                var searchRecs //= req.query.filtertRecs;
                //console.log(req.session.filteredRecs);
                if (req.session.filteredRecs) {
                    filterText = req.session.filterText;
                    searchRecs = req.session.filteredRecs;
                    req.session.filteredRecs = null;
                    req.session.filterText = null;
                }

                const existingUser = await Usrnm.findOne(query).exec();
                const userCredits = await userCreds.findOne({user: req.query.usrid}).exec();
                var calRecs = userCredits.recmarked[1];
                var recs = [];
                recs = await Rec.find({}).exec();
                recs.sort((a, b) => new Date(b.ts) - new Date(a.ts));
                allRecs = recs;
                var newestRecs = recs.slice(0, 7);
                let recrToSend = [];
                if(searchRecs === undefined || searchRecs === null || searchRecs === 'undefined' || searchRecs === 'null'){
                    recrToSend = newestRecs;
                }else{
                    recrToSend = searchRecs;
                }
                if(existingUser){
                    const username = existingUser.usrnm;
                    return res.render('index', { title: 'Lires', usrnm: username, recs: recrToSend, dataDays: getNextThreeDatesWithEntries(calRecs, allRecs), filterText: filterText });
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
            if(marked.recmarked[0].includes(recid)){
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
    fetch('https://www.chefkoch.de/' + req.query.link, { method: 'HEAD' })
    .then(response => {
        if (!response.ok || response.status !== 200) {
            res.json({ error: 'Invalid link' }).end();
        } else {
            chefkoch.chefkochAPI.getRecipe(req.query.link)
                .then(data => {
                    res.json(data);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Error fetching data' });
                });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data' });
    });
});
router.post('/search', async (req, res) => {
    const { recTitle } = req.body
    var recs = await Rec.find({}).exec();
    var recsPrefer 
    if (recTitle) {
        recsPrefer = recs.find(rec => rec.recname.toLowerCase().includes(recTitle.toLowerCase())) || null;
    }
    if (recsPrefer === null) {
        recsPrefer = emptyRecDeafult;
    }
    req.session.filteredRecs = [recsPrefer];
    req.session.filterText = 'Suchergebnisse für ' + recTitle;
    return res.json({
        sucess: true,
    });  

});
router.get('/allrecs', async (req, res) => {
    var recs = await Rec.find({}).exec();
    
    res.render('allrecs', { title: 'Lires', usrnm: req.query.usrnm, recs: recs});
})


router.post('/recList', async (req, res) => {
    const { recfilter, showText } = req.body; 

    const recs = await Rec.find({}).exec();
    const filteredRecs = recs.filter(rec => 
        Array.isArray(rec.kindodish) &&
        rec.kindodish.some(dish => dish.toLowerCase() === recfilter?.toLowerCase())
    );
    req.session.filteredRecs = filteredRecs;
    req.session.filterText = showText;
    return res.json({
        sucess: true,
    });
});
router.get('/reportAny', (req, res) => {
    res.render('report', { title: 'Lires', usrnm: req.query.usrnm });
});
router.get('/editFriend', (req, res) => {
    res.render('friendsonly', { title: 'Lires', usrnm: req.query.usrnm });
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
            recmarked: [[recid],[]]
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
                existingExtras.recmarked[0] = existingExtras.recmarked[0].filter(rec => rec !== recid);
            }else{
                existingExtras.recmarked[0].push(recid);
            }
            existingExtras.markModified('recmarked');
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
        //console.log('Message sent: %s', info.messageId);
        const parts  = req.body.user.split(' ');
        //console.log('/?usrnm=' + parts[0] + '&usrid=' + parts[1] + '&message=true');
        return res.redirect('/?usrnm=' + parts[0] + '&usrid=' + parts[1] + '&message=true');
    });

});

module.exports = router;