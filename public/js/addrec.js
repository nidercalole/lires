//ich bin ganz :B
function zaehleZeichen(string) {
  return string.length;
}

let counter = 0;
function addTableRow() {
  const tableInp11 = document.getElementById("tableInp11").value;
  const tableInp12 = document.getElementById("tableInp12").value;
  var table = document.getElementById("table1");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.textContent = tableInp11;
  cell2.textContent = tableInp12;

  cell1.id = "resing_" + counter;
  cell2.id = "resingamount_" + counter;

  counter++;
  document.getElementById("tableInp11").value = "";
  document.getElementById("tableInp12").value = "";
}

var input = document.getElementById("backfisch");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTableRow();
  }
});

function chooseBtn(){
  const btn = document.getElementById('chooseBtn');
  const stepwise = document.getElementById('stepwise');
  const explanation = document.getElementById('explanation');
  if (btn.textContent === "Im Fließtext beschreiben") {
    btn.textContent = "Schrittweise beschreiben";
    stepwise.classList.remove('hidden');
    explanation.classList.add('hidden');
  } else {
    btn.textContent = "Im Fließtext beschreiben";
    stepwise.classList.add('hidden');
    explanation.classList.remove('hidden');
  }
}

function countChars(){
  const krzDesc = document.getElementById('krzDesc');
  const charCount = document.getElementById('charCount');
  charCount.textContent = `${zaehleZeichen(krzDesc.value)}/500`
}
//label
let lblcounter = 0;
function addlabl() {
  const shoInfInp = document.getElementById("shoInfInp").value;
  const lbls = document.getElementById("lbls");
  lbls.className = "lbls";
  let lbl = document.createElement("p");
  lbl.textContent = shoInfInp;
  lbl.id = "lbl_" + lblcounter;
  lbl.classList.add("lbl");
  lbls.appendChild(lbl);
  lblcounter++;

  document.getElementById("shoInfInp").value = "";
}

const shoInfInp = document.getElementById('shoInfInp');
shoInfInp.addEventListener('keypress', function(event){
  if (event.key === "Enter") {
    event.preventDefault();
    addlabl();
  }
});

let stepid = 2;
function addstepp() {
  const steps = document.getElementById("stepwise");
  let step = document.createElement("textarea");
  step.id = "step_" + stepid;
  step.classList.add("stepvorgehen");
  steps.appendChild(step);
  stepid++;
}