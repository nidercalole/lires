const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usrnm = require('../models/usrnm');
const Rec = require('../models/rec');
const List = require('../models/list');
const { format } = require('path');


router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send(Error('GET request to /api/addrecrouter'));
});
router.get('/lists', async(req, res) => {
    try {
        const user = req.query.username;
        const lists = await List.find({ "user.0": user }).exec();
        var listCounter = 0;
        var itemCounter = 0;
        var finalJSON =[];
        lists.forEach(list => {
            listCounter++;
            items = [];
            list.list.forEach(ing => {
                itemCounter++;
                var checked;
                if(ing[3] === true){
                    checked = true;
                }else{
                    checked = false;
                }

                items.push({id: itemCounter, name: ing[0], quantity: (ing[1] + " " + ing[2]), checked: checked});
            });
            formattedList = {
                id: listCounter,
                name: list.listname,
                items: items
            }
            finalJSON.push(formattedList);
        });
        res.json(finalJSON);
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

module.exports = router;