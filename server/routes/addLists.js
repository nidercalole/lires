const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const Unverify = require('../models/unverify');
const Verify = require('../models/verify');
const idUnverifys = '6667388c04a3ed7a5539fb55';
const idVerifys = '66673a48df82133513053caa';
const List = require('../models/list');

router.use(bodyParser.json());

router.post('/', async(req, res) => {
    let defaultList = false;
    try {
        const { ingList, selectedLists, user, newlistName } = req.body;
        //console.log(ingList, selectedLists, user, newlistName);
        if(selectedLists.length === 0){
            return res.json({ success: true});
        }else if(selectedLists[0] === 'defaultListNew'){
            defaultList = true;
            selectedLists.splice(0, 1);
        }
        if(selectedLists.length === 0){
            newlist = new List({
                user: user,
                listname: newlistName,
                list: ingList,
                listid: Math.random().toString(36).substring(2, 12)
            });
            await newlist.save();
            return res.json({ success: true});
        }else{
            for (let i = 0; i < selectedLists.length; i++) {
                const query = { listid: selectedLists[i] };
                const existingList = await List.findOne(query).exec();

                if (existingList) {
                    for (let i = 0; i < ingList.length; i++) {
                        let index = existingList.list.findIndex(
                            entry => entry[0] === ingList[i][0]
                        );
                        if (index > -1) {
                            // Zutat existiert bereits
                            if (existingList.list[index][2] === ingList[i][2]) {
                                // Einheit gleich -> Mengen addieren          
                                existingList.list[index][1] += ingList[i][1];
                                existingList.markModified('list');
                                await existingList.save();
                            } else if (existingList.list[index][2] === '') {
                                // Einheit leer -> Einheit und Menge setzen
                                existingList.list[index][1] += ingList[i][1];
                                existingList.list[index][2] = ingList[i][2];
                                existingList.markModified('list');
                                await existingList.save();
                            } else {
                                // Einheiten unterschiedlich -> Neuer Eintrag
                                existingList.list.push([ingList[i][0], ingList[i][1], ingList[i][2]]);
                            }
                        } else {
                            existingList.list.push(ingList[i]);
                        }
                    }
                    await existingList.save();
                } else {
                    return res.json({ success: false });
                }
            }
            if(defaultList){
                newlist1 = new List({
                    user: user,
                    listname: newlistName,
                    list: ingList,
                    listid: Math.random().toString(36).substring(2, 12)
                });
                await newlist1.save();
            }
            return res.json({ success: true});
        }
        
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }

});

router.post('/getLists', async(req, res) => {
    try {
        const { user } = req.body;
        const query = { user: user };
        const lists = await List.find(query).exec();
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});
router.post('/listItemCheckUpdate', async(req, res) => {
    try {
        const { listid, ingIndex, checked } = req.body;
        const query = { listid: listid };
        const existingList = await List.findOne(query).exec();
        if (existingList) {
            existingList.list[ingIndex][3] = checked;
            existingList.markModified("list");
            await existingList.save();
        } 
        else {
            return res.json({ success: false });
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});
router.post('/deleteListItem', async(req, res) => {
    try {
        const { listid, ingIndex } = req.body;
        const query = { listid: listid };
        const existingList = await List.findOne(query).exec();
        if (existingList) {
            existingList.list.splice(ingIndex, 1);
            existingList.markModified("list");
            await existingList.save();
        } else {
            return res.json({ success: false });
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});
router.post('/deleteList', async(req, res) => {
    try {
        const { listid } = req.body;
        const query = { listid: listid };
        await List
            .findOneAndDelete(query)
            .exec();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});
module.exports = router;