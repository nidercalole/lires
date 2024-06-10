function extval(str){return document.getElementById(str).value;}
function exttxt(str){return document.getElementById(str).textContent;}

function sendData(
    titel, 
    usrnm,
    aufwand, 
    zubereitungsdauer, 
    kurzbeschreibung, 
    labels, 
    ingredients, 
    directions, 
    coutfor, 
    kindodish
){
    if(usrnm === null){
        window.location.href = "/login";
        return;
    }else if(titel === "" || usrnm === ""){
        alert("Bitte füllen Sie den Titel des Rezepts aus.");
        return;
    }else if(zubereitungsdauer === ""){
        alert("Bitte füllen Sie die Zubereitungsdauer des Rezepts aus.");
        return;
    }else if(ingredients.length < 2){
        alert("Bitte fügen Sie mindestens zwei Zutat hinzu.");
        return;
    }else if(directions[1] === ""||directions[1] === undefined){
        alert("Bitte fügen Sie mindestens eine Zubereitungshinweis hinzu.");
        return;
    }
    fetch('/addrec/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recname: titel,
            user: usrnm,
            expense: aufwand,
            duration: zubereitungsdauer,
            description: kurzbeschreibung,
            countfor: coutfor,
            kindodish: kindodish,
            labels: labels,
            ingredients: ingredients,
            directions: directions
        })
    })
    .then(response => response.json())
    .then(data => {
        //console.log('Success:', data);

        fetch('/addrec/addrecingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recname: titel
            })
        })
        .then(response => response.json())
        .then(data => {
            //console.log('Success:', data);
            window.location.href = "/verify/?usrnm=" + usrnm;
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function collectAndSend(){
    var kindodish = []
    function extck(str){
        if(document.getElementById(str).checked){
            kindodish.push(str);
            return true;
        }else{
            return false;
        }
    }

    const usrnm = new URLSearchParams(window.location.search).get("usrnm");
    const chooseBtn = exttxt("chooseBtn");
    const ingtabl = document.getElementById("table1").rows.length;
    const lbls = document.getElementById("lbls").getElementsByTagName('*').length;

    var labels = [];
    var ingredients = [];
    var directions = [];
    var coutfor = [extval("anzInp"), extval("anzEinhInp")]
    extck("warm"); extck("kalt"); extck("vorspeise"); extck("hptgrcht"); extck("nchtsch"); extck("vgtrsch"); extck("vgn"); extck("flsch"); extck("fsch"); extck("gms"); extck("ndl"); extck("brt"); extck("dips"); extck("spp"); extck("slt"); extck("kchn"); extck("gbck"); extck("grtn"); extck("knsrvrt"); extck("suess"); extck("hrzhft"); extck("fngrfd");

    if (chooseBtn === "Im Fließtext beschreiben") {
        directions.push({steppwise:false})
        directions.push(extval("explanation"));
    }else{
        var stepwise = document.getElementById("stepwise").getElementsByTagName('*').length;
        directions.push({steppwise:true})
        for (let i = 1; i < stepwise+1; i++) {
            const step = extval("step_" + i)
            directions.push({i, step});
        }
    }
    for (let i = 0; i < ingtabl-2; i++) {
        const ing = exttxt("resing_" + i);
        const ingamount = parseInt(exttxt("resingamount_" + i));
        const ingunit = exttxt("resingunit_" + i);
        const ingextra = ''
        ingredients.push({ing, ingextra, ingamount, ingunit});
    }
    for (let i = 0; i < lbls; i++) {
        const lbl = exttxt("lbl_" + i);
        labels.push(lbl);
    }
    sendData(
        extval("recTitle"),
        usrnm,
        extval("aufwRange"),
        extval("zubDauInp"),
        extval("krzDesc"),
        labels,
        ingredients,
        directions,
        coutfor,
        kindodish
    );
};