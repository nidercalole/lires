// DOM-Element auswählen, das die Swipe-Geste erkennen soll
const swipeArea = document.getElementById('swipeArea');

// Variablen zum Verfolgen der Start- und Endposition des Touch-Events
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// Touchstart-Ereignis: Startposition des Touch-Ereignisses speichern
swipeArea.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

swipeArea.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
});

swipeArea.addEventListener('touchend', (event) => {
   
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontaler Wisch
        if (deltaX > 0) {
            console.log('Von links nach rechts gewischt');
            window.location.href='/mobile/verify?usrnm=' + document.getElementById('usrnm').textContent;
        } else {
            console.log('Von rechts nach links gewischt');
            window.location.href='/mobile/lists?usrnm=' + document.getElementById('usrnm').textContent;
        }
    } else {
        // Vertikaler Wisch
        if (deltaY > 0) {
            console.log('Von oben nach unten gewischt');
        } else {
            console.log('Von unten nach oben gewischt');
        }
    }
});

function buttaddrec(){
    window.location.href='/mobile/addrec?usrnm=' + document.getElementById('usrnm').textContent;
}
function inputRecTitle(){
    const recTitle = document.getElementById('recTitle');
    const inputWidth = recTitle.scrollWidth; 
    recTitle.style.width = inputWidth + "px"; 
};

function openTagList(){
    if(document.getElementById('mobileTagList').className == 'hidden'){
        document.getElementById('mobileTagList').className = '';
    }else{
        document.getElementById('mobileTagList').className = 'hidden';
    }

}
function redirectHome() {
    const username = document.getElementById('usrnm').textContent
    window.location.href = '/mobile/verify/?usrnm=' + username;
}