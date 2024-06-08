function extck(str){return document.getElementById(str).checked;}
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
        console.log('Success:', data);
        window.location.href = "/verify/?usrnm=" + usrnm;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function collectAndSend(){
    const usrnm = new URLSearchParams(window.location.search).get("usrnm");
    const chooseBtn = exttxt("chooseBtn");
    const ingtabl = document.getElementById("table1").rows.length;
    const lbls = document.getElementById("lbls").getElementsByTagName('*').length;

    var labels = [];
    var ingredients = [];
    var directions = [];
    var coutfor = [extval("anzInp"), extval("anzEinhInp")]
    var kindodish = [{warm:extck("warm"), kalt:extck("kalt"), vorspeise:extck("vorspeise"), hptgrcht:extck("hptgrcht"), nchtsch:extck("nchtsch"), vgtrsch:extck("vgtrsch"), vgn:extck("vgn"), flsch:extck("flsch"), fsch:extck("fsch"), gms:extck("gms"), ndl:extck("ndl"), brt:extck("brt"), dips:extck("dips"), spp:extck("spp"), slt:extck("slt"), kchn:extck("kchn"), gbck:extck("gbck"), grtn:extck("grtn"), knsrvrt:extck("knsrvrt"), suess:extck("suess"), hrzhft:extck("hrzhft"), fngrfd:extck("fngrfd")}]

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
        ingredients.push({ing, ingamount, ingunit});
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