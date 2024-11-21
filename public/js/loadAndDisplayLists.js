function getUserCredentials() {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}

function openDropdown(id, button) {
    const dropdownContent = document.getElementById(id);
    dropdownContent.classList.toggle('open'); 
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
                let ingamountshow = '';
                let ingunitshow = '';
                if(ing[1] === 0){
                    ingamountshow = '';
                    ingunitshow = '';
                }else{
                    ingamountshow = ing[1];
                    ingunitshow = ing[2];
                }
                itemsStacked += `<input type="checkbox" class="checkboxLists" id="${list.listid + i}"> <label for="${list.listid + i}">${ingamountshow} ${ingunitshow} ${ing[0]}</label><br>`;
                i++
            });
            let item = document.createElement('div');
            item.classList.add('dropdown');
            item.id = list.listid;
            item.innerHTML = `
            <div class="divRow">
                <div class="dropdown-button" onclick="openDropdown('${list.listid}', this)"><listName>${list.listname}</listName></div>
                <div class="listsBtns">
                    <button class="editLists">
                        <img src="/img/edit.png" width="20px" height="20px" alt="Bearbeite diese Liste" onclick="irgendwas()">
                    </button>
                    <button class="editLists">
                        <img src="/img/x.png" width="20px" height="20px alt="Lösche diese Liste" onclick="irgendwas2()">
                    </button>
                </div>
            </div>
            <div class="dropdown-content">${itemsStacked}</div>`;
            listContainer.appendChild(item);

        });
    });
}
loadAndDisplayLists();