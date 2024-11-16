function addToAnyListClose(){
    document.getElementById('filIngPage').style.display = 'none';
}
function addToAnyList(){
        document.getElementById('filIngPage').style.display = 'grid';
}

function dontAdd(id){
    document.getElementById(id.id).classList.toggle('dontAdd');
    document.getElementById(id.id + "greyable").classList.toggle('ingsListShowNotNotGreyed');

}

function toggleSelectionLists(element){
    element.classList.toggle('selected');

}

function addToListFinal(){
    let selected = document.querySelectorAll('.ingsListShowNotNotGreyed');
    console.log(selected);  
    let ingList = [];
    selected.forEach(ing => {
        ingList.push(ing.textContent);
    });
    console.log(ingList);   
}

