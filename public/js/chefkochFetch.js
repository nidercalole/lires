
function gebId(str){
    return document.getElementById(str);
}

function checkTags(value){
    switch (value){
        case "Vorspeise":
            gebId("vorspeise").checked = true
            break
        case "Hauptspeise":
            gebId("hptgrcht").checked = true
            break
        case "Nachspeise":
            gebId("nchtsch").checked = true
            break
        case "Warm":
                gebId("warm").checked = true
            break
        case "Kalt":
                gebId("kalt").checked = true
            break
        case "Vegetarisch":
                gebId("vgtrsch").checked = true
            break
        case "Vegan":
                gebId("vgn").checked = true
            break
        case "Fleisch":
                gebId("flsch").checked = true
            break
        case "Fisch":
                gebId("fsch").checked = true
            break
        case "Gemüse":
                gebId("gms").checked = true
            break
        case "":
                gebId("").checked = true
            break
        case "Nudeln":
                gebId("ndl").checked = true
            break
        case "Brot":
                gebId("brt").checked = true
            break
        case "Dips":
                gebId("dips").checked = true
            break
        case "Suppe":
                gebId("spp").checked = true
            break
        case "Kuchen":
                gebId("kchn").checked = true
            break
        case "Herzhaft":
                gebId("hrzhft").checked = true
            break
        case "Fingerfood":
                gebId("fngrfd").checked = true
            break
        case "Gebäck":
                gebId("gbck").checked = true
            break
        default:
            return
    }
}


function addChefkochRec(){
    const link = gebId("chefkoch-link").value
    gebId("darkBgChefkoch").style.display = "none";
    if (!link.trim()) {
        alert("Bitte gib einen gültigen Link an.");
        return;
    }


    fetch('/getRecChefkoch?link=' + link)
    .then(response => data = response.json())
    .then(data => {
        if (data.error) {
            return;
        }
        //console.log(data)
        gebId("recTitle").value = data.name  
        gebId("krzDesc").textContent = data.name
        if(gebId("chooseBtn").textContent == "Beschreibung schrittweise"){
            chooseBtn()
        }
        const stepInp = gebId("step_1")
        stepInp.value = data.description
        stepInp.dispatchEvent(new Event("input", { bubbles: true })); //trigger input event for resizing the textcontent

        data.tags.forEach(tag => {
            tag = tag.name.trim()
            checkTags(tag)
        });

        data.ingredients.forEach(ing => {
            gebId("tableInp11").value = ing.name
            ingparts = ing.amount.split(" ",2)
            if (ingparts.length < 2) {
                ingparts = [ingparts[0] || '', ''];
            }
            gebId("tableInp12").value = ingparts[0]
            gebId("tableInp13").value = ingparts[1]
            addTableRow()
        }); 
        gebId("anzInp").value = data.portions
        gebId("anzEinhInp").value = "Portionen"
        gebId("zubDauInp").value = data.overallTime
        data.shortInfo.forEach(info => {
            gebId("shoInfInp").value = info
            addlabl()
        });
        gebId("aufwRange").value = data.dificulty
    })
}