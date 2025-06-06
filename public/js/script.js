
let ended = false;
function getUserCredetials(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}
function redirectHome() {
    const username = document.getElementById('usrnm').textContent
    console.log(username);
    window.location.href = '/verify/?usrnm=' + username;
}
function showMessageIf(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('message') != null){
        document.getElementById('responseAddListOk').style.display = 'block';
        setTimeout(() => {
            document.getElementById('responseAddListOk').style.display = 'none';
        }, 2000);
    }
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


function inputRecTitle(){
    const recTitle = document.getElementById('recTitle');
    const inputWidth = recTitle.scrollWidth; 
    recTitle.style.width = inputWidth + "px"; 
};


function buttaddrec(){
    const user = getUserCredetials();
    window.location.href = '/addrec/?usrnm=' + user[0] + '&usrid=' + user[1];
};


function filBut(){
    const filOptionPage = document.getElementById('darkBg');
    if (filOptionPage.style.display === 'none' || filOptionPage.style.display === '') {
        filOptionPage.style.display = 'block';
        document.addEventListener('keydown', closeOnEvent);
        gebId('darkBg').addEventListener('click', closeOnEvent);
        gebId('filbut').blur();
        document.addEventListener('keydown', searchOnEnter)
    } else{
        filOptionPage.style.display = 'none';
        document.removeEventListener('keydown', closeOnEvent);
        document.removeEventListener('keydown', searchOnEnter)
    }
}
function searchOnEnter(event){
    if (event.key === 'Enter'){
        collectDataForSearch()
        filBut()
    }
}
function closeOnEvent(event) {
    if (event.key === 'Escape' || (event.type === 'click' && event.target === gebId('darkBg'))) {
        document.getElementById('darkBg').style.display = 'none';
        document.removeEventListener('keydown', closeOnEvent);
    }
}

//inputUpdate at filter
function maxDauerInput(){
    const maxMin = document.getElementById('maxMin');
    const maxDauer = document.getElementById('maxDauer');
    if(maxDauer.value == 14){
        maxMin.textContent = 'Es wird nicht nach Zeit gefiltert';
    }else{
        maxMin.textContent = `Dir werden Rezepte mit einer Zubereitungsdauer von maximal ${maxDauer.value} Minuten angezeigt.`;
    }
};

//redirect to profile
function redirectProfil(){
    const user = getUserCredetials();
    window.location.href = '/profile/?usrnm=' + user[0] + '&usrid=' + user[1] + "&usertosee=" + user[1];
}

function openRec(recid){
    if(recid === undefined || recid === null || recid === "" || recid === '0' || recid === 0){
        return;
    }
    const user = getUserCredetials();
    window.location.href = '/recipe/?usrnm=' + user[0] + '&usrid=' + user[1] + '&recid=' + recid;
}
function openCalView(){
    const user = getUserCredetials();
    window.location.href = '/calendar/?usrnm=' + user[0] + '&usrid=' + user[1];
    fetch('/calendar/cleanUpOldEntries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usrid: getUserCredetials()[1],
        })
    })
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

    //const zubDauer = document.getElementById('maxDauer').value;
    //const zutEx = document.getElementById('zutFilterMainex').value;
    //const zutIn = document.getElementById('zutFilterMainin').value;
    //const prEx = document.getElementById('prFilterMainex').value;
    //const prIn = document.getElementById('prFilterMainin').value;
    //const zubEx = document.getElementById('zubFilternMainEx').value;
    const recTitle = document.getElementById('suchleiste').value;
    if (recTitle == '') {
        return;
    }
    await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            //zubDauer: zubDauer,
            //zutEx: zutEx,
            //zutIn: zutIn,
            //prEx: prEx,
            //prIn: prIn,
            //zubEx: zubEx,
            recTitle: recTitle
        }),
    }).then(response => response.json())
    .then(data => {
        if(data.sucess){
            window.location.href = `/?usrnm=${user[0]}&usrid=${user[1]}`;
        }
    });
}
async function getAndShowAllRecs(){
    const user = getUserCredetials();
    window.location.href = `allrecs/?usrnm=${user[0]}&usrid=${user[1]}`;
}

let scrollIndex = 0;
function scrollButtons(dir) {
  wrapper = document.getElementById("buttonWrapper");
  const buttonWidth = 167;
  const visibleButtons = 7.5;
  const maxScroll = 14 - visibleButtons;
  scrollIndex = Math.min(Math.max(scrollIndex + dir * 2.85, 0), maxScroll);

  wrapper.style.transform = `translateX(-${scrollIndex * buttonWidth}px)`;
  if (scrollIndex == 0) {
    document.getElementById("arr-left").style.display = "none";
  } else if (scrollIndex == maxScroll) {
    document.getElementById("arr-right").style.display = "none";
  } else {
    document.getElementById("arr-left").style.display = "block";
    document.getElementById("arr-right").style.display = "block";
  }
}


async function openRecList(filter, showText) {
    const user = getUserCredetials();
    //console.log(filter, showText);

    await fetch('/recList', {
        method: 'POST',  // Ändern von GET auf POST
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recfilter: filter, showText: showText }) // JSON-Body statt Query-Parameter
    })
    .then(response => response.json())
    .then(data => {
        if(data.sucess){
        window.location.href = `/?usrnm=${user[0]}&usrid=${user[1]}`;
        }
    });
}
function reportAny(){
    const user = getUserCredetials();
    window.location.href = '/reportAny/?usrnm=' + user[0] + '&usrid=' + user[1];
}

function openEditFriend(){
    const user = getUserCredetials();
    window.location.href = '/editFriend/?usrnm=' + user[0] + '&usrid=' + user[1];
}
function openEditCalender(){
    const user = getUserCredetials();
    window.location.href = '/editCalenderAny/?usrnm=' + user[0] + '&usrid=' + user[1];
}
function openEditLists(){
    const user = getUserCredetials();
    window.location.href = '/editList/?usrnm=' + user[0] + '&usrid=' + user[1];
}
function irgendwas2(event) {
    event.stopPropagation(); 
}
showMessageIf();

function adjustVH_VW() {
    const scaleFactor = 100 / (window.devicePixelRatio * 100); 
    const correctedScale = 1 / scaleFactor; // Umkehrung der Skalierung
    const userAgent = navigator.userAgent.toLowerCase();
    const isFirefox = userAgent.includes("firefox");

    if (scaleFactor < 1) {
        if (isFirefox) {
            document.body.style.transform = `scale(${scaleFactor})`;
            document.body.style.transformOrigin = "top left";
            document.body.style.width = `${100 / scaleFactor}%`;
            document.body.style.height = `${100 / scaleFactor}%`;
        } else {
            document.body.style.zoom = scaleFactor;
        }

        // Korrigierte vh und vw setzen
        document.documentElement.style.setProperty("--vh", `${window.innerHeight * correctedScale}px`);
        document.documentElement.style.setProperty("--vw", `${window.innerWidth * correctedScale}px`);
    } else {
        document.body.style.transform = "";
        document.body.style.zoom = "";
        document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
        document.documentElement.style.setProperty("--vw", `${window.innerWidth}px`);
    }
}
window.addEventListener("resize", adjustVH_VW);
window.addEventListener("load", adjustVH_VW);


const searchInput = document.getElementById("suchleiste");

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement === searchInput) {
    event.preventDefault(); // Verhindert das Standardverhalten (z. B. Formular-Absenden)
    getCurrentSearchConfig();
  }
});