//ich bin ganz :B
function zaehleZeichen(string) {
  return string.length;
}
function gebId(str) {
  return document.getElementById(str);
}

let counter = 0;
function addTableRow() {
  const table = gebId("table1");
  if (!gebId("tableInp11").value) {
    alert("Bitte geben Sie eine Zutat ein.");
    return;
  }

  const row = table.insertRow(-1);
  const cells = [
    { value: gebId("tableInp11").value, idPrefix: "resing_" },
    { value: gebId("tableInp12").value, idPrefix: "resingamount_" },
    { value: gebId("tableInp13").value, idPrefix: "resingunit_" },
  ];

  cells.forEach((cellData, index) => {
    const cell = row.insertCell(index);
    cell.textContent = cellData.value;
    cell.id = cellData.idPrefix + counter;
    cell.classList.add("tableInp");
  });

  counter++;
  ["tableInp11", "tableInp12", "tableInp13"].forEach((id) => {
    gebId(id).value = "";
  });

  gebId("tableInp11").select();
}

var input = document.getElementById("backfisch");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTableRow();
  }
});

function chooseBtn() {
  const btn = gebId("chooseBtn");
  const stepwise = gebId("stepwise");
  const stepaddbtn = gebId("stepaddbtn");
  const explanation = gebId("explanation");
  if (btn.textContent === "Im Fließtext beschreiben") {
    btn.textContent = "Schrittweise beschreiben";
    stepaddbtn.classList.remove("hidden");
    stepwise.classList.remove("hidden");
    explanation.classList.add("hidden");
  } else {
    btn.textContent = "Im Fließtext beschreiben";
    stepaddbtn.classList.add("hidden");
    stepwise.classList.add("hidden");
    explanation.classList.remove("hidden");
  }
}

function countChars() {
  const krzDesc = gebId("krzDesc");
  const charCount = gebId("charCount");
  charCount.textContent = `${zaehleZeichen(krzDesc.value)}/250`;
}
//label
let lblcounter = 0;
function addlabl() {
  const shoInfInp = gebId("shoInfInp").value;
  const lbls = gebId("lbls");
  lbls.className = "lbls";
  let lbl = document.createElement("p");
  lbl.textContent = shoInfInp;
  lbl.id = "lbl_" + lblcounter;
  lbl.classList.add("lbl");
  lbls.appendChild(lbl);
  lblcounter++;

  gebId("shoInfInp").value = "";
}

const shoInfInp = gebId("shoInfInp");
shoInfInp.addEventListener("keypress", function (event) {
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

const krzDesc = document.getElementById("krzDesc");
krzDesc.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
