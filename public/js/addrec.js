//ich bin ganz :B
function zaehleZeichen(string) {
  return string.length;
}

let counter = 0;
function addTableRow() {
  var tableInp11 = document.getElementById("tableInp11").value;
  var tableInp12 = document.getElementById("tableInp12").value;
  var tableInp13 = document.getElementById("tableInp13").value;
  if (tableInp11 === "") {
    return alert("Bitte geben Sie eine Zutat ein.");
  }
  var table = document.getElementById("table1");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.textContent = tableInp11;
  cell2.textContent = tableInp12;
  cell3.textContent = tableInp13;
  cell1.id = "resing_" + counter;
  cell2.id = "resingamount_" + counter;
  cell3.id = "resingunit_" + counter;
  cell1.classList.add("tableInp");
  cell2.classList.add("tableInp");
  cell3.classList.add("tableInp");

  counter++;
  document.getElementById("tableInp11").value = "";
  document.getElementById("tableInp12").value = "";
  document.getElementById("tableInp13").value = "";
  document.getElementById("tableInp11").select();
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
  const stepaddbtn = document.getElementById('stepaddbtn')
  const explanation = document.getElementById('explanation');
  if (btn.textContent === "Im Fließtext beschreiben") {
    btn.textContent = "Schrittweise beschreiben";
    stepaddbtn.classList.remove('hidden');
    stepwise.classList.remove('hidden');
    explanation.classList.add('hidden');
  } else {
    btn.textContent = "Im Fließtext beschreiben";
    stepaddbtn.classList.add('hidden')
    stepwise.classList.add('hidden');
    explanation.classList.remove('hidden');
  }
}

function countChars(){
  const krzDesc = document.getElementById('krzDesc');
  const charCount = document.getElementById('charCount');
  charCount.textContent = `${zaehleZeichen(krzDesc.value)}/250`
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
  step.placeholder = "Schritt " + stepid;
  step.classList.add("stepvorgehen");
  steps.appendChild(step);
  stepid++;
}