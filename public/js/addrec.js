//ich bin ganz :B

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
}

var input = document.getElementById("backfisch");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTableRow();
  }
});

document.querySelector(".chooseBtn").addEventListener("click", function () {
  if (this.textContent === "Im Fließtext beschreiben") {
    this.textContent = "Schrittweise beschreiben";
  } else {
    this.textContent = "Im Fließtext beschreiben";
  }
});


document.addEventListener('DOMContentLoaded', (event) =>{
  const krzDesc = document.getElementById('krzDesc');
  const charCount = document.getElementById('charCount');
  krzDesc.addEventListener('input', () => {
    charCount.textContent = `${krzDesc.value.lenght}/500`
  });
}); //Und weil ich auch doofes Javascript bin, funktionier ich au nich :(