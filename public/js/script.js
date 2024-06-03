document.addEventListener('DOMContentLoaded', (event) => {
    //splitleft Growing
    let ended = false;
    const ListBut = document.getElementById('ListBut');
    const listArea = document.getElementById('listArea');

     ListBut.onclick = function() {
        if (ended) {
            listArea.classList.remove('growing');
        } else {
            listArea.classList.add('growing');
        }
        ended = !ended; 
     } 
    //slider
    const maxDauer = document.getElementById('maxDauer');
    const maxMin = document.getElementById('maxMin');
    maxMin.textContent = maxDauer.value;
    maxDauer.addEventListener('change', function() {
        maxMin.textContent = maxDauer.value;
    });
    //redirectHome
    /*const logo = document.getElementById('logo');
    logo.onclick = function() {
        window.location.href = '/';
    }*/
});

function filBut(){
    const filOptionPage = document.getElementById('filOptionPage');
    if (filOptionPage.style.display === 'none' || filOptionPage.style.display === '') {
        filOptionPage.style.display = 'grid';
    } else{
        filOptionPage.style.display = 'none';
    }
}


