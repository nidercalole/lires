const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const usrnm = require('../models/usrnm');
const userCreds = require('../models/usercreds');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const usrid = req.query.usrid;
    query2 = { user: usrid };
    const existingUser = await userCreds.findOne(query2).exec();
    if(existingUser == null) return res.redirect('/login?message=Benutzer nicht gefunden.&islogin=true');

    const recs = await Rec.find({}).exec();
    var markedRecs = recs.filter(rec => existingUser.recmarked[0].includes(rec.recid));
    var usedRecs = existingUser.recmarked[1].map(rec => rec[0]);
    usedRecs = recs.filter(rec => usedRecs.includes(rec.recid));

    if(markedRecs.length === 0){ markedRecs = [new Rec({recname: 'Keine Rezepte markiert', user: [usrid, '']})]}
    if(usedRecs.length === 0){ usedRecs = [new Rec({recname: 'Noch keine Rezepte Verwendet', user: [usrid, '']})]}
    //console.log(existingUser.recmarked[1]);

    res.render('calMain', { title: 'Lires', usrnm: req.query.usrnm, markedRecs: markedRecs, recs: recs, usedRecs: usedRecs, recsMarkedOne: existingUser.recmarked[1] });
});

router.post('/addRecToCollection', async (req, res) => {
    const { recid, usrid, date, cloneId } = req.body;
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() );
    query2 = { user: usrid };
    const existingUserCreds = await userCreds.findOne(query2).exec();
    if(existingUserCreds == null) return res.json({ success: false, message: 'Benutzer nicht gefunden.' });
    existingUserCreds.recmarked[1].push([recid, newDate, cloneId]);
    existingUserCreds.markModified('recmarked');
    await existingUserCreds.save();
    res.json({ success: true });
    
})
router.post('/removeRecFromCollection', async (req, res) => {
    const { usrid, cloneId } = req.body;
    query2 = { user: usrid };
    const existingUserCreds = await userCreds.findOne(query2).exec();
    if(existingUserCreds == null) return res.json({ success: false, message: 'Benutzer nicht gefunden.' });
    existingUserCreds.recmarked[1] = existingUserCreds.recmarked[1].filter(rec => rec[2] !== cloneId);
    existingUserCreds.markModified('recmarked');
    await existingUserCreds.save();
    res.json({ success: true });
    
});
router.post("/cleanUpOldEntries", async (req, res) => {
  const { usrid } = req.body;
  const query2 = { user: usrid };
  const existingUserCreds = await userCreds.findOne(query2).exec();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  if (!existingUserCreds) {
    return res.json({ success: false, message: "Benutzer nicht gefunden." });
  }
  existingUserCreds.recmarked[1] = existingUserCreds.recmarked[1].filter(
    (rec) => {
      const date = new Date(rec[1]);
      return date >= oneWeekAgo;
    }
  );
  
  existingUserCreds.markModified("recmarked");
  await existingUserCreds.save();

  res.json({ success: true });
});
module.exports = router;