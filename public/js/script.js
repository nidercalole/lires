//growing list
let ended = false;

listButclick = function(){
    const listArea = document.getElementById('listArea');

    if (ended) {
        listArea.classList.remove('growing');
    } else {
        listArea.classList.add('growing');
    }
    ended = !ended; 
 };

//inputRecTitle
inputRecTitle = function(){
    const recTitle = document.getElementById('recTitle');
    const inputWidth = recTitle.scrollWidth; 
    recTitle.style.width = inputWidth + "px"; 
};

//buttaddrec
buttaddrec = function(){
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
maxDauerInput = function(){
    const maxMin = document.getElementById('maxMin');
    const maxDauer = document.getElementById('maxDauer');
    maxMin.textContent = maxDauer.value;
};

//redirect to profile
function redirectProfil(){
    const username = document.getElementById('usrnm').textContent
    window.location.href = '/profile/?usrnm=' + username;
}