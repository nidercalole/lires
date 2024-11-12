function getUserCredetials(){
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return [urlParams.get('usrnm'), urlParams.get('usrid')]
}

function initialLoad(){
    const user = getUserCredetials();
    const adminTools = document.getElementById('admintools');
    if(user[1] === '6k31a7cdbga' || user[1] === 'l725iqftr0l'){
        adminTools.style.display = 'block';
    }
}
initialLoad();
function openAdminTools(){
    window.location.href = '/addrec/verify/?usrnm=' + getUserCredetials()[0] + '&usrid=' + getUserCredetials()[1];

}