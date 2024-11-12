function gebId(id) {
    return document.getElementById(id);
}
function getUserCredetials(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}
function loadAllRecources() {
    const selfRecs = JSON.parse(gebId('selfRecs').textContent);
    selfRecs.sort((a, b) => new Date(b.ts) - new Date(a.ts));
    var newestRecs = selfRecs.slice(0, 5);

    let index = 1;
    newestRecs.forEach(rec => {
        gebId('recList' + index).textContent = rec.recname;
        gebId('recList' + index).setAttribute('onclick', `openRec('${rec.recid}')`);
        index++;
    });
}
loadAllRecources();

function openRec(recid) {
    const user = getUserCredetials();
    window.location.href = '/recipe/?usrnm=' + user[0] + '&usrid=' + user[1] + "&recid=" + recid;
}