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

                itemsStacked += `<p>${ing[0]} ${ ingamountshow} ${ingunitshow}</p>`;

            });
            let item = document.createElement('div');
            item.classList.add('dropdown');
            item.id = list.listid;
            item.innerHTML = `
            <button class="dropdown-button" onclick="openDropdown('${list.listid}', this)">${list.listname}</button>
            <div class="dropdown-content">${itemsStacked}</div>`;
            listContainer.appendChild(item);

        });
    });
}
loadAndDisplayLists();