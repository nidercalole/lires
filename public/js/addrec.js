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
  if (btn.textContent === "Im Fließtext beschreiben") {
    btn.textContent = "Schrittweise beschreiben";
  } else {
    btn.textContent = "Im Fließtext beschreiben";
  }
}

function countChars(){
  const krzDesc = document.getElementById('krzDesc');
  const charCount = document.getElementById('charCount');
  charCount.textContent = `${zaehleZeichen(krzDesc.value)}/500`
}
