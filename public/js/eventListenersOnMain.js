function fillButClose(){
    console.log('close');
    const filOptionPage = document.getElementById('filOptionPage');
    filOptionPage.style.display = 'none';
}
document.getElementById('nichtFilter').addEventListener('click', fillButClose);
