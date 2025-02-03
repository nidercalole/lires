function gebId(id){
    return document.getElementById(id);
}
function getUserCredetials(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}
async function collectDataForSearch() {
    const zutFilterMainin = Array.from(gebId('zutFilterMainin').selectedOptions).map(option => option.value); // Array of ings to include into a responded search query
    const prFilterMainin = Array.from(gebId('prFilterMainin').selectedOptions).map(option => option.value); // Array of processes to include from a responded search query
    const zutFilterMainex = Array.from(gebId('zutFilterMainex').selectedOptions).map(option => option.value); // Array of ings to exclude from a responded search query
    const prFilterMainex = Array.from(gebId('prFilterMainex').selectedOptions).map(option => option.value); // Array of processes to exclude from a responded search query
    const maxDauer = gebId('maxDauer').value; 

    await fetch('/addrec/filterRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            zubDauer: maxDauer,
            zutEx: zutFilterMainex,
            zutIn: zutFilterMainin,
            prEx: prFilterMainex,
            prIn: prFilterMainin
        }),
    }).then(async response => {
        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
            loadFilterdRecs(data); //loadFilterdRecs muss man noch machen !!!!!!!!
        }
    }).catch(error => {
        console.error('Error:', error);
    });


}