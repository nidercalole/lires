function getUserCredetials() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return [urlParams.get("usrnm"), urlParams.get("usrid")];
}

function initialLoad() {
  const user = getUserCredetials();
  const adminTools = document.getElementById("admintools");
  if (user[1] === "6k31a7cdbga" || user[1] === "l725iqftr0l") {
    return;
  } else {
    adminTools.style.display = "none";
  }
}
initialLoad();
function openAdminTools() {
  window.location.href =
    "/addrec/verify/?usrnm=" +
    getUserCredetials()[0] +
    "&usrid=" +
    getUserCredetials()[1];
}
document.getElementById("suchleiste").addEventListener("input", function () {
  let maxLength = 800;
  var inputLength = this.value.length;
  var newWidth = Math.min(inputLength * 10 + 20, maxLength);

  if (newWidth < 250) {
    newWidth = 250;
  }
  this.style.width = newWidth + "px";
});
