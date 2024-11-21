const recData = JSON.parse(document.getElementById('recipeData').textContent);

function achtungDieseFunktionHatSchonEineFunktionInRECIPEJSAberhierFehltnochwas() {
    const saveRecButton = document.getElementById('saveRec');
    const currentImage = saveRecButton.querySelector('img');
    
    if (currentImage) {
        if (currentImage.src.includes('/img/nadel.png')) {
            currentImage.src = '/img/nadelfull.png';
            saveRecButton.style.outline = '2px solid #caffee';
        } else {
            currentImage.src = '/img/nadel.png'; // Bild zurücksetzen
            saveRecButton.style.outline = 'transparent';
        }
    }    
}

function formatDateToSchee(datee) {
  const date = new Date(datee);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Monate sind 0-indexiert
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}
function gebId(str){
    return document.getElementById(str);
}
const formatText = (text) => {
    return text.replace(/([.!?])\s*(?=[A-Z])/g, '$1<br>');
  };
function updatelist(){
    let ingAddCount = 0;
    var indexmultiplier = gebId('countfor').value 
    var origindex = recData.countfor[0];
    var multiplier = indexmultiplier/origindex;
    let list = gebId('fixTable');
    list.innerHTML = `
    <tr>
        <td class="moreWidth bold">Zutaten</td>
        <td class="bold">Menge</td>
    </tr>`;
    recData.ingredients.forEach(ing => {
        let ingamountshow = '';
        let ingunitshow = '';
        if(ing.ingamount === 0 || ing.ingamount === null || ing.ingamount === undefined){
            ingamountshow = '';
            ingunitshow = '';
        }else{
            ingamountshow = (ing.ingamount*multiplier).toFixed(0);
            ingunitshow = ing.ingunit;
        }
        let item = document.createElement('tr');
        item.innerHTML = `
        <td>${ing.ing} ${ing.ingextra}</td>
        <td>${(ingamountshow) + ' ' + ingunitshow}</td>`;
        list.appendChild(item);
    });
    let listAdd = gebId('fixTable1');
    listAdd.innerHTML = `
    <tr>
        <td class="moreWidth bold">Zutaten</td>
        <td class="bold">Menge</td>
    </tr>`;
    ingAddCount = 0;
    recData.ingredients.forEach(ing => {
        let ingamountshow = '';
        let ingunitshow = '';
        if(ing.ingamount === 0 || ing.ingamount === null || ing.ingamount === undefined){
            ingamountshow = '';
            ingunitshow = '';
        }else{
            ingamountshow = (ing.ingamount*multiplier).toFixed(0);
            ingunitshow = ing.ingunit;
        }
        let item = document.createElement('tr');
        item.id = "posIngsToAdd" + ingAddCount;
        item.innerHTML = `
        <td class="ingsListShowNotNotGreyed" id="posIngsToAdd${ingAddCount}greyable">${ing.ing}</td>
        <td><input type="text" class="ingamountinput" id="ingamount${ingAddCount}" value="${ingamountshow + ' ' + ingunitshow}"></td>
        <td class="ingredientstablenotableview" onclick="dontAdd(${`posIngsToAdd${ingAddCount}`})">
            <img width="20px" src="/img/wegbut.png" alt="Zutat verwerfen">
        </td>`;
        listAdd.appendChild(item);
        ingAddCount++;
    });
}

function loadRecData(ammount){
    gebId('recName').textContent = recData.recname;
    gebId('userAndDate').textContent = `Von ${recData.user[0]} am ${formatDateToSchee(recData.ts)}`;
    gebId('duration').textContent = recData.duration;
    difimg = gebId('difficulty');
    switch(recData.expense){
        case 1:
            difimg.src = '/img/1star.png'; 
            break;
        case 2:
            difimg.src = '/img/2star.png';
            break;
        case 3:
            difimg.src = '/img/3star.png';
            break;
        case 4:
            difimg.src = '/img/4star.png';
            break;
        case 5:
            difimg.src = '/img/5star.png';
            break;
    }
    gebId('description').textContent = recData.description;
    if(recData.directions[0].steppwise === false){
        gebId('directions').innerHTML = formatText(recData.directions[1]);
    }else{
        gebId('directions').textContent = '';
        for (let i = 1; i < recData.directions.length; i++) {
            gebId('directions').innerHTML += `<br><span class="bold">Schritt ${recData.directions[i].i}:</span> ${recData.directions[i].step}<br>`;

        }
    }
    gebId('countforenh').innerHTML = `Zutaten für <input class="mengeInp" placeholder="[Zahl]" type="number" min="1" id="countfor"> ${recData.countfor[1]}`;
    gebId('countfor').value = recData.countfor[0];
    for (let i = 0; i < recData.kindodish.length; i++) {
        var lbl = ''
        switch (recData.kindodish[i]) {
            case 'warm':
            lbl = 'Warm';
                break;
            case 'kalt':
            lbl = 'Kalt';
                break;
            case 'vorspeise':
            lbl = 'Vorspeise';
                break;
            case 'hptgrcht':
            lbl = 'Hauptgericht';
                break;
            case 'nchtsch':
            lbl = 'Nachtisch';
                break;
            case 'vgtrsch':
            lbl = 'Vegetarisch';
                break;
            case 'vgn':
            lbl = 'Vegan';  
                break;
            case 'flsch':
            lbl = 'Fleisch';
                break;
            case 'fsch':
            lbl = 'Fisch';
                break;
            case 'gms':
            lbl = 'Gemüse';
                break;
            case 'ndl':
            lbl = 'Nudeln';
                break;
            case 'brt':
            lbl = 'Brot/Brötchen';
                break;
            case 'dips':
            lbl = 'Soßen/Dips';
                break;
            case 'spp':
            lbl = 'Suppen';
                break;
            case 'slt':
            lbl = 'Salate';
                break;
            case 'kchn':
            lbl = 'Kuchen';
                break;
            case 'gbck':
            lbl = 'Gebäck';
                break;
            case 'grtn':
            lbl = 'Überbacken/Gratin';
                break;
            case 'knsrvrt':
            lbl = 'Konserviertes';
                break;
            case 'suess':
            lbl = 'Süßspeisen';
                break;
            case 'hrzhft':
            lbl = 'Herzhaftes';
                break;
            case 'fngrfd':
            lbl = 'Fingerfood';
                break;
            case 'fstlch':
            lbl = 'Festlich';
                break;
            case 'grlln':
            lbl = 'Grillen';
                break;
            case 'aufstrch':
            lbl = 'Aufstrich';
                break;
            case 'gtrnk':
            lbl = 'Getränke';
                break;
            case 'gkcht':
            lbl = 'Gekocht';
                break;
            case 'gbrtn':
            lbl = 'Gebraten';
                break;
            case 'gdnstt':
            lbl = 'Gedünstet';
                break;
            case 'gbckn':
            lbl = 'Gebacken';
                break;
            case 'ubrbckn':
            lbl = 'Überbacken';
                break;
            case 'mrnrt':
            lbl = 'Mariniert';
                break;
            case 'frttrt':
            lbl = 'Frittiert';
                break;
            case 'hltbr':
            lbl = 'Haltbar gemacht';
                break;
            case 'blg':
            lbl = 'Beilage';
                break;
            case 'frstck':
            lbl = 'Frühstück';
                break;
            case 'kndr':
            lbl = 'Kinder';
                break;
            case 'frcht':
            lbl = 'Früchte';
                break;

        }
        gebId('miniLbl' + (i+1)).classList.remove('hidden');
        gebId('miniLbl' + (i+1)).textContent = lbl;
    }
    for (let i = 0; i < recData.labels.length; i++) {
        gebId('krzInf' + (i+1)).classList.remove('hidden');
        gebId('krzInf' + (i+1)).textContent = recData.labels[i];
    }
    updatelist();
}
loadRecData();
gebId('countfor').addEventListener('input', updatelist);
