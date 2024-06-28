const recData = JSON.parse(document.getElementById('recipeData').textContent);
function gebId(str){
    return document.getElementById(str);
}
function updatelist(){
    var indexmultiplier = gebId('countfor').value 
    var origindex = recData.countfor[0];
    var multiplier = indexmultiplier/origindex;
    let list = gebId('fixTable');
    list.innerHTML = `
    <tr>
        <td class="moreWidth bold">Zutaten</td>
        <td class="bold">Menge</td>
    </tr>
    `;
    recData.ingredients.forEach(ing => {
        let item = document.createElement('tr');
        item.innerHTML = `
        <td>${ing.ing}</td>
        <td>${((ing.ingamount*multiplier).toFixed(0)) + ing.ingunit}</td>
        `;
        list.appendChild(item);
    });
}

function loadRecData(ammount){
    gebId('recName').textContent = recData.recname;
    gebId('userAndDate').textContent = `Von ${recData.user[0]} am ${new Date(recData.ts).toLocaleDateString()}`;
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
        gebId('directions').textContent = recData.directions[1];
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
            lbl = 'Brot/Brötcen';
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
