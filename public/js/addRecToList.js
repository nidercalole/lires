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

async function addToListFinal(){
    let selectedings = document.querySelectorAll('.ingsListShowNotNotGreyed');
    let ingList = [];
    selectedings.forEach(ing => {
        let valueid = 'ingamount' + (ing.id).match(/\d+/)[0]
        const value = document.getElementById(valueid).value;
        const unit = document.getElementById(valueid).parentElement.textContent;
        if(unit === null|| unit === undefined){unit = '';}
        if(value === null || value === undefined){value = '';}
        ingList.push([ing.textContent, value, unit]);

    });
    let selectedLists = document.querySelectorAll('.selected');
    let finalLists = [];
    selectedLists.forEach(list => {
        finalLists.push(list.id);
    });

    await fetch('/addToList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingList: ingList,
            selectedLists: finalLists,
        })
    }).then((res) => {
        if(res.ok){
            return res.json();
        }else{
            throw new Error('Fehler beim Hinzufügen der Zutaten zur Liste');
        }
    });

}

