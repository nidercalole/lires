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
    //console.log(element);
    element.classList.toggle('selected');

}

function showResponseOk(){
    document.getElementById('responseAddListOk').style.display = 'block';
    setTimeout(() => {
        document.getElementById('responseAddListOk').style.display = 'none';
    }, 2000);
}

function showResponseNotOk(){
    document.getElementById('responseAddListNotOk').style.display = 'block';
    setTimeout(() => {
        document.getElementById('responseAddListNotOk').style.display = 'none';
    }, 2000);
}

function getUserCreds(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}


async function addToListFinal(){
    let selectedings = document.querySelectorAll('.ingsListShowNotNotGreyed');
    let ingList = [];
    selectedings.forEach(ing => {
        let valueid = 'ingamount' + (ing.id).match(/\d+/)[0]
        const value = document.getElementById(valueid).value;
        var ingamount = document.getElementById(valueid).value
        var ingunit = ingamount.match(/[a-zA-Z]+/g);
        if(ingamount === 0 || ingamount === null || ingamount === undefined || ingamount === ' '){
            ingamount = 0;
        }else{
            ingamount = parseInt(ingamount);
        }
        if(ingunit === null){
            ingunit = '';
        }else{
            ingunit = ingunit[0];
        }
        ingList.push([ing.textContent, ingamount, ingunit, false]);

    });
    let selectedLists = document.querySelectorAll('.selected');
    let finalLists = [];
    let newlistName = '';
    if(document.getElementById('inputListNameNew').value === ''){
        newlistName = 'Neue Liste';
    }else{
        newlistName = document.getElementById('inputListNameNew').value;
    }
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
            user: getUserCreds(),
            newlistName: newlistName
        })
    }).then((res) => {
        if(res.ok){
            addToAnyListClose();
            showResponseOk();
            return res.json();
        }else{
            addToAnyListClose();
            showResponseNotOk();
            throw new Error('Fehler beim Hinzufügen der Zutaten zur Liste');
        }
    });

}

