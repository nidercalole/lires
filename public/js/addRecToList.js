function addToAnyList(){
    if(document.getElementById('filIngPage').style.display == 'grid'){
        document.getElementById('filIngPage').style.display = 'none';
    }else{
        document.getElementById('filIngPage').style.display = 'grid';
    }
}
function addToAnyListClose(){
    document.getElementById('filIngPage').style.display = 'none';
}
function dontAdd(id){
    console.log(id);
    document.getElementById(id).classList.add('dontAdd');
}
document.getElementById('closeArea').addEventListener('click', addToAnyListClose);