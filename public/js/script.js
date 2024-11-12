

//test
//growing list
let ended = false;
function getUserCredetials(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}

function listButclick(){
    const listArea = document.getElementById('listArea');

    if (ended) {
        listArea.classList.remove('growing');
    } else {
        listArea.classList.add('growing');
    }
    ended = !ended; 
 };

//inputRecTitle
function inputRecTitle(){
    const recTitle = document.getElementById('recTitle');
    const inputWidth = recTitle.scrollWidth; 
    recTitle.style.width = inputWidth + "px"; 
};

//buttaddrec
function buttaddrec(){
    const user = getUserCredetials();
    window.location.href = '/addrec/?usrnm=' + user[0] + '&usrid=' + user[1];
};

//gridstyle
function filBut(){
    const filOptionPage = document.getElementById('filOptionPage');
    if (filOptionPage.style.display === 'none' || filOptionPage.style.display === '') {
        filOptionPage.style.display = 'grid';
    } else{
        filOptionPage.style.display = 'none';
    }
}

//inputUpdate at filter
function maxDauerInput(){
    const maxMin = document.getElementById('maxMin');
    const maxDauer = document.getElementById('maxDauer');
    if(maxDauer.value == 14){
        maxMin.textContent = 'Es wird nicht nach Zeit gefiltert';
    }else{
        maxMin.textContent = `Dir werden Rezepte mit einer Zubereitungsdauer von maximal ${maxDauer.value} Minuten angezeigt`;
    }
};

//redirect to profile
function redirectProfil(){
    const user = getUserCredetials();
    window.location.href = '/profile/?usrnm=' + user[0] + '&usrid=' + user[1] + "&usertosee=" + user[1];
}

function openRec(recid){
    const user = getUserCredetials()[0];
    window.location.href = '/recipe/?usrnm=' + user[0] + '&userid' + user[1] + '&recid=' + recid;
}

const options = document.querySelectorAll('option');

options.forEach(option => {
    option.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Verhindert das Standardverhalten
        option.selected = !option.selected; // Auswahl umschalten
    });
});

//default search fuction
async function getCurrentSearchConfig() {
    const user = getUserCredetials();

    const kindOfDish = Array.from(document.getElementById('kindOfDishFilterMain').selectedOptions).map(option => option.value);
    const zubDauer = document.getElementById('maxDauer').value;
    const zutEx = document.getElementById('zutFilterMainex').value;
    const zutIn = document.getElementById('zutFilterMainin').value;
    const prEx = document.getElementById('prFilterMainex').value;
    const prIn = document.getElementById('prFilterMainin').value;
    const zubEx = document.getElementById('zubFilternMainEx').value;
    const recTitle = document.getElementById('suchleiste').value;
    await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            kindOfDish: kindOfDish,
            zubDauer: zubDauer,
            zutEx: zutEx,
            zutIn: zutIn,
            prEx: prEx,
            prIn: prIn,
            zubEx: zubEx,
            recTitle: recTitle
        }),
    }).then(response => response.json())
    .then(filtertRecs => {
        const queryParams = new URLSearchParams({
            filtertRecs: JSON.stringify(filtertRecs)
        }).toString();
        
        window.location.href = `/?${queryParams}&usrnm=${user[0]}&usrid=${user[1]}`;
    });
    //console.log(kindOfDish, zubDauer, zutEx, zutIn, prEx, prIn, zubEx, recTitle);
}
async function getAndShowAllRecs(){
    const user = getUserCredetials();
    window.location.href = `allrecs/?usrnm=${user[0]}&usrid=${user[1]}`;
}

