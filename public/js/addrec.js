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
    const input = document.createElement("input");
    input.type = "text";
    input.value = cellData.value;
    input.id = cellData.idPrefix + counter;
    input.classList.add("tableInp");
    cell.appendChild(input);
  });

  // Add delete button
  const deleteCell = row.insertCell(cells.length);
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Löschen";
  deleteButton.classList.add("deleteBtn");
  deleteButton.addEventListener("click", function () {
    const table = gebId("table1");
    table.deleteRow(row.rowIndex);
  });
  deleteCell.appendChild(deleteButton);

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
  if (btn.textContent === "Beschreibung als Fließtext") {
    btn.textContent = "Beschreibung schrittweise";
    stepaddbtn.classList.add("hidden");
    stepwise.classList.add("hidden");
    explanation.classList.remove("hidden");
  } else {
    btn.textContent = "Beschreibung als Fließtext";
    stepaddbtn.classList.remove("hidden");
    stepwise.classList.remove("hidden");
    explanation.classList.add("hidden");
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
  lbl.textContent = "● " + shoInfInp;
  lbl.id = "lbl_" + lblcounter;
  lbl.classList.add("lbl");
  lbls.insertBefore(lbl, lbls.firstChild);
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
  let delBut  = document.createElement("button");
  delBut.textContent = "Löschen";
  delBut.classList.add("deleteBtnVorgehen");
  const currentStepId = stepid; // Capture the current stepid
  delBut.addEventListener("click", function () {
    const step = document.getElementById("step_" + currentStepId);
    if (step) {
      steps.removeChild(delBut.previousElementSibling);
      steps.removeChild(delBut);
      updateStepNums();
    }
  });
  function updateStepNums() {
    const allSteps = steps.querySelectorAll(".stepvorgehen");
    allSteps.forEach((step, index) => {
      step.placeholder = "Schritt " + (index + 1);
     // step.id = "step_" + (index + 1);
    });
  }
  steps.appendChild(delBut);
  step.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
  step.style.height = "auto";
  step.style.height = step.scrollHeight + "px";
  stepid++;
  updateStepNums();
}

growTextarea("krzDesc");
growTextarea("explanation");

const textareas = document.getElementById("stepwise").querySelectorAll("textarea");
textareas.forEach((textarea) => {
  growTextarea(textarea.id);
});

function growTextarea(elementId) {
  const element = document.getElementById(elementId);
  element.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
}