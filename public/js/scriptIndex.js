const dataDays = JSON.parse(document.getElementById('dataDaysMain').textContent);

function gebId(string){
    return document.getElementById(string);
}

switch (dataDays.length) {
    case 0:
        break;
    case 3:
        gebId('thirdNextRec').style.display = 'flex';
        gebId('thirdNextRec').onclick = function() {
            detViewforDay(dataDays[2][1], dataDays[2][0]);
        }
        gebId('thirdNextReccalDatum').textContent = dataDays[2][0]
        gebId('thirdNextReccalRecNumber').textContent = dataDays[2][1].length
        if (dataDays[2][1].length > 1) {
            gebId('thirdNextRecDiv').textContent = 'Rezepte'
        }else{
            gebId('thirdNextRecDiv').textContent = 'Rezept'
        }
    case 2:
        if(dataDays.length == 2){
            gebId('nextRecs').classList.remove('spaceBetween');
            gebId('nextRecs').classList.add('nextTwoRecs');
            gebId('secondNextRec').style.margin = '0px 20px';
        }
        gebId('secondNextRec').style.display = 'flex';
        gebId('secondNextRec').onclick = function() {
            detViewforDay(dataDays[1][1], dataDays[1][0]);
        }
        gebId('secondNextReccalDatum').textContent = dataDays[1][0]
        gebId('secondNextReccalRecNumber').textContent = dataDays[1][1].length
        if (dataDays[1][1].length > 1) {
            gebId('secondNextRecDiv').textContent = 'Rezepte'
        }else{
            gebId('secondNextRecDiv').textContent = 'Rezept'
        }
    case 1:
        gebId('firstNextRec').style.display = 'flex';
        gebId('firstNextRec').onclick = function() {
            detViewforDay(dataDays[0][1], dataDays[0][0]);
        };
        gebId('firstNextReccalDatum').textContent = dataDays[0][0]
        gebId('firstNextReccalRecNumber').textContent = dataDays[0][1].length
        if (dataDays[0][1].length > 1) {
            gebId('firstNextRecDiv').textContent = 'Rezepte'
        }else{
            gebId('firstNextRecDiv').textContent = 'Rezept'
        }
        break;
}

function detViewforDay(dayData, day){
    var dur = 0;
    dayData.forEach(rec => dur += rec.duration);
    gebId('detViewRecHolderMain').innerHTML = '';
    gebId('detViewforToday').classList.remove('hidden');
    gebId('detViewCalDatum').textContent = 'Detailansicht '+ day;
    gebId('detViewCalDuration').textContent = 'Gesamtzeit: ' + dur + ' min';
    dayData.forEach(rec => {
        gebId('detViewRecHolderMain').innerHTML += `
             <div class="detailRec" onclick = "openRec('${rec.recid}')">
              <detailRecName>${rec.recname}</detailRecName>
              <br>
              <detailRecDauer>${rec.duration} min</detailRecDauer>
            </div>
            <hr class="detailRecLine">
        `;
    });
}