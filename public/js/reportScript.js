

function openImpressum() {
    window.location.href = '/impressum/?usrnm=' + getUserCredetials()[0] + '&usrid=' + getUserCredetials()[1];
}
function openDSGVO() {
    window.location.href = '/dsgvo?usrnm=' + getUserCredetials()[0] + '&usrid=' + getUserCredetials()[1]
}