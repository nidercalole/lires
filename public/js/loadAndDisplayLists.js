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
                //<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"> <label for="vehicle1"> I have a bike</label><br></br>
                itemsStacked += `<input type="checkbox" id="${list.listid + i}"> <label for="${list.listid + i}">${ingamountshow} ${ingunitshow} ${ing[0]}</label><br>`;
                //itemsStacked += `<listContentTxt>${ ingamountshow} ${ingunitshow}</listContentTxt><listContentTxt>${ing[0]}</listContentTxt><br>`;
                i++
            });
            let item = document.createElement('div');
            item.classList.add('dropdown');
            item.id = list.listid;
            item.innerHTML = `
            <div class="dropdown-button" onclick="openDropdown('${list.listid}', this)"><listName>${list.listname}</listName></div>
            <div class="dropdown-content">${itemsStacked}</div>`;
            listContainer.appendChild(item);

        });
    });
}
loadAndDisplayLists();