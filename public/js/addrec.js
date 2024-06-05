//Ich bin ein kaputtes js Dokument :( 
/*
console.log("loaded");
var input = document.getElementById("tableInp1");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    function addTableRow() {
        var table = document.getElementById("table1");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "NEW CELL1";
        cell2.innerHTML = "NEW CELL2";
      }
  }
});
*/
//ich bin ganz :B

let counter = 0;
function addTableRow() {
  var table = document.getElementById("table1");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";

  cell1.id = "resing_" + counter;
  cell2.id = "resingamount_" + counter;

  counter++;
}

var input = document.getElementById("tableInp1");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTableRow();
  }
});