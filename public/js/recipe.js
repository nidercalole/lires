const recData = JSON.parse(document.getElementById('recipeData').textContent);
function gebId(str){
    return document.getElementById(str);
}
function updatelist(){
    let list = gebId('fixTable');
    list.innerHTML = `
    <tr>
        <td class="moreWidth">Zutaten</td>
        <td>Menge</td>
    </tr>
    `;
    recData.ingredients.forEach(ing => {
        let item = document.createElement('tr');
        item.innerHTML = `
        <td>${ing.ing}</td>
        <td>${ing.ingamount}</td>
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
    gebId('directions').textContent = recData.directions[1];
    gebId('countforenh').innerHTML = `Zutaten für <input class="mengeInp" placeholder="[Zahl]" type="number" min="1" id="countfor"> ${recData.countfor[1]}`;
    gebId('countfor').value = recData.countfor[0];
    updatelist();
}
loadRecData();
