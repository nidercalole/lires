//test
//growing list
let ended = false;

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
    const username = document.getElementById('usrnm').textContent
    window.location.href = '/addrec/?usrnm=' + username;
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
    const username = document.getElementById('usrnm').textContent
    window.location.href = '/profile/?usrnm=' + username;
}