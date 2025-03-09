const dataDays = JSON.parse(document.getElementById('dataDaysMain').textContent);

console.log(dataDays);

switch (dataDays.length) {
    case 0:
        break;
    case 3:
        document.getElementById('thirdNextRec').style.display = 'flex';
        document.getElementById('thirdNextRec').onclick = function() {
            detViewforDay(dataDays[2][1]);
        }
        document.getElementById('thirdNextReccalDatum').textContent = dataDays[2][0]
        document.getElementById('thirdNextReccalRecNumber').textContent = dataDays[2][1].length
        if (dataDays[2][1].length > 1) {
            document.getElementById('thirdNextRecDiv').textContent = 'Rezepte'
        }else{
            document.getElementById('thirdNextRecDiv').textContent = 'Rezept'
        }
    case 2:
        if(dataDays.length == 2){
            document.getElementById('nextRecs').classList.remove('spaceBetween');
            document.getElementById('nextRecs').classList.add('nextTwoRecs');
            document.getElementById('secondNextRec').style.margin = '0px 20px';
        }
        document.getElementById('secondNextRec').style.display = 'flex';
        document.getElementById('secondNextRec').onclick = function() {
            detViewforDay(dataDays[1][1]);
        }
        document.getElementById('secondNextReccalDatum').textContent = dataDays[1][0]
        document.getElementById('secondNextReccalRecNumber').textContent = dataDays[1][1].length
        if (dataDays[1][1].length > 1) {
            document.getElementById('secondNextRecDiv').textContent = 'Rezepte'
        }else{
            document.getElementById('secondNextRecDiv').textContent = 'Rezept'
        }
    case 1:
        document.getElementById('firstNextRec').style.display = 'flex';
        document.getElementById('firstNextRec').onclick = function() {
            detViewforDay(dataDays[0][1]);
        };
        document.getElementById('firstNextReccalDatum').textContent = dataDays[0][0]
        document.getElementById('firstNextReccalRecNumber').textContent = dataDays[0][1].length
        if (dataDays[0][1].length > 1) {
            document.getElementById('firstNextRecDiv').textContent = 'Rezepte'
        }else{
            document.getElementById('firstNextRecDiv').textContent = 'Rezept'
        }
        break;
}

function detViewforDay(day){
    console.log(day);
}