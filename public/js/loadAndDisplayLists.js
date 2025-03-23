function getUserCredentials() {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}


function loadAndDisplayLists() {
    user = getUserCredentials();
    fetch('/addToList/getLists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user
        })
    }).then(response => response.json())
    .then(lists => {
        const listContainer = document.getElementById('dropdownsLists');
        let itemsStacked = '';
        lists.forEach(list => {
            itemsStacked = '';
            var i = 0
            list.list.forEach(ing => {
                var checked = '';
                if(ing[3] === true){
                    checked = 'checked';
                }
                let ingamountshow = '';
                let ingunitshow = '';
                if(ing[1] === 0){
                    ingamountshow = '';
                    ingunitshow = '';
                }else{
                    ingamountshow = ing[1];
                    ingunitshow = ing[2];
                }
                itemsStacked += 
                `<div class="divRowListElement kumpeln spaceBetween">
                    <div class="kumpeln noMargin noPadding">
                        <input type="checkbox" class="checkboxLists" id="${list.listid + i}" ${checked}> <label for="${list.listid + i}">${ingamountshow} ${ingunitshow} ${ing[0]}</label>
                    </div>
                    <div class="listsBtnsListElement">
                        <button class="editLists">
                            <img src="/img/x.png" width="15px" height="15px" alt="Lösche diese Liste" onclick="deleteListItem('${list.listid}', ${i})">
                        </button>
                    </div>
                </div>`;
                i++
            });
            let inputing = document.createElement('div');
            inputing.classList.add('divRowListElement');
            inputing.innerHTML = `
            <div class="kumpeln spaceBetween">
                <div class="kumpeln">
                    <input type="text" class="inputLists nomargin widthDreiSiebenFuenf" id="inputListsAmount_${list.listid}" placeholder="Menge">
                    <input type="text" class="inputLists nomargin" id="inputListsIng_${list.listid}" placeholder="Zutat">
                </div>
                <button class="editLists" onclick="addListItemExtern('${list.listid}')">
                    Hinzufügen
                </button>
            </div>`;
            
            itemsStacked += inputing.outerHTML;
            let item = document.createElement('div');
            item.classList.add('dropdown');
            item.id = list.listid;
            item.innerHTML = `
            <div class="listComplete">
                <div class="lists kumpeln spaceBetween" onclick="openDropdown('${list.listid}')">
                    <div class="dropdown-button" ><listName>${list.listname}</listName></div>
                    <div>
                        <button class="editLists">
                            <img src="/img/x.png" width="20px" height="20px" alt="Lösche diese Liste" onclick="deletList('${list.listid}')">
                        </button>
                    </div>
                </div>
                
                <div class="dropdown-content">${itemsStacked}</div>
            </div>
            <hr class="listTitleLine">`;
            listContainer.appendChild(item);

        });
    });
}
loadAndDisplayLists();

async function deleteListItem(id, ingIndex) {
    console.log(id);
    const listid = id
    const user = getUserCredentials();
    await fetch('/addToList/deleteListItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            listid: listid,
            ingIndex: ingIndex
        })
    }).then(response => response.json())
    .then(data => {
        if(data.success === true){
            sessionStorage.setItem("openDropdownAfterReload", listid);
            location.reload();
        }
    });
}
async function deletList(listid) {
    const user = getUserCredentials();
    //console.log(listid);
    await fetch('/addToList/deleteList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            listid: listid
        })
    }).then(response => response.json())
    .then(data => {
        if(data.success === true){
            location.reload();
        }
    });
}
window.addEventListener("DOMContentLoaded", async () => {
    const listid = sessionStorage.getItem("openDropdownAfterReload");
    if (listid) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Warte kurz, bis DOM aktualisiert ist
        openDropdown(listid); 
        sessionStorage.removeItem("openDropdownAfterReload"); 
    }
});

async function addListItemExtern(listid) {

    const user = getUserCredentials();
    const amount = document.getElementById('inputListsAmount_' + listid).value;

    const ing = document.getElementById('inputListsIng_' + listid).value;
    const match = amount.match(/^(\d+)([a-zA-Z]*)$/);
    match[1] = parseInt(match[1]);
    let ingFinal = [];
    if (match) {
        
        ingFinal = [ing, match[1], match[2], false];
    } else {
        ingFinal = [ing, 0, '', false];
    }

    //console.log(listid, amount, ing,ingFinal);
    await fetch('/addToList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user,
            selectedLists: [listid],
            ingList: [ingFinal]
        })
    }).then(response => response.json())
    .then(data => {
        if(data.success === true){
            sessionStorage.setItem("openDropdownAfterReload", listid);
            location.reload();
        }
    });
}


function openDropdown(id) {
    console.log(id);
    const dropdownContent = document.getElementById(id);
    dropdownContent.classList.toggle('open'); 
}