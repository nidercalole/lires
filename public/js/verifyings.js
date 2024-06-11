var lbls = [];
function extck(str){
    if(document.getElementById(str).checked){
        lbls.push(str);
        return true;
    }else{
        return false;
    }
}
function exttxt(str){return document.getElementById(str).textContent;}


function verifyIng(){
    extck("unverarbeitet");extck("verarbeitet");extck("glutenfrei");extck("laktosefrei");extck("vegan");extck("vegetarisch");extck("saisonal");extck("regional");extck("importiert");extck("süß");extck("sauer");extck("salzig");extck("bitter");extck("milchprodukt");extck("fleischprodukt");extck("fisch");extck("gemüse");extck("obst");extck("getreide");extck("hülsenfrüchte");extck("nüsse");extck("samen");extck("gewürz");extck("kräuter");extck("flüssigkeit");extck("backware");extck("gekühlt");extck("gefroren");extck("konserviert");
    if(lbls.length === 0){
        alert("Bitte mindestens ein Label auswählen.");
    }else{
        //send so store
        return
    }
}