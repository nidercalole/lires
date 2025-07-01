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
    }else if(coutfor[0] === "" || coutfor[1] === ""){
        alert("Bitte füllen Sie die Anzahl und die Einheit der Portionen aus.");
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
            if(data.useragent === 'mobile'){
                window.location.href = "/mobile/verify?usrnm=" + usrnm;
                return;
            }else{
                window.location.href = "/verify/?usrnm=" + usrnm;
                return;
            }
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
    extck("warm"); extck("kalt"); extck("vorspeise"); extck("hptgrcht"); extck("nchtsch"); extck("vgtrsch"); extck("vgn"); extck("flsch"); extck("fsch"); extck("gms"); extck("ndl"); extck("brt"); extck("dips"); extck("spp"); extck("slt"); extck("kchn"); extck("gbck"); extck("grtn"); extck("knsrvrt"); extck("suess"); extck("hrzhft"); extck("fngrfd");extck("fstlch");extck("grlln");extck("aufstrch");extck("gtrnk");extck("gkcht");extck("gbrtn");extck("gdnstt");extck("gbckn");extck("ubrbckn");extck("mrnrt");extck("frttrt");extck("hltbr");extck("blg");extck("frstck");extck("kndr");extck("frcht");

    if (chooseBtn === "Im Fließtext beschreiben") {
        directions.push({steppwise:false})
        directions.push(extval("explanation"));
    }else{
        var stepwise = document.getElementById("stepwise").getElementsByTagName('textarea').length;
        console.log("stepwise: " + stepwise);
        directions.push({steppwise:true})
        let counterreal = 0;
        for (let i = 1; counterreal < stepwise; i++) {
            const stepprob = document.getElementById("step_" + i);
            if (stepprob === null) {
                continue;
            }else{
                counterreal++;
                const step = extval("step_" + i)
                directions.push({i: counterreal, step: step});
            }
        }
    }
    for (let i = 0; i < ingtabl-2; i++) {
        const ing = extval("resing_" + i);
        const ingamount = parseInt(extval("resingamount_" + i));
        const ingunit = extval("resingunit_" + i);
        const ingextra = ''
        ingredients.push({ing, ingextra, ingamount, ingunit});
    }
    for (let i = 0; i < lblcounter; i++) {
        let lbl = exttxt("lbl_" + i).replace(/^●\s*/, ""); 
        lbl = lbl.slice(0, -7); // Entfernt die letzten 7 Zeichen
        console.log(lbl)
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