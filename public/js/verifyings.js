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
function extval(str){return document.getElementById(str).value;}


function verifyIng(usrnm, usrid){
    extck("unverarbeitet");extck("verarbeitet");extck("glutenfrei");extck("laktosefrei");extck("vegan");extck("vegetarisch");extck("saisonal");extck("regional");extck("importiert");extck("süß");extck("sauer");extck("salzig");extck("bitter");extck("milchprodukt");extck("fleischprodukt");extck("fisch");extck("gemüse");extck("obst");extck("getreide");extck("hülsenfrüchte");extck("nüsse");extck("samen");extck("gewürz");extck("kräuter");extck("flüssigkeit");extck("backware");extck("gekühlt");extck("gefroren");extck("konserviert");
    //console.log(extval("ingextra"), extval("ingname"));  
    if(lbls.length === 0){
        alert("Bitte mindestens ein Label auswählen.");
    }else{
        fetch('/addrec/verify/verifyIngredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                labels: lbls,
                ingnameold: extval("ingnameold"),
                send: extval("send"),
                ingname: extval("ingname"),
                ingextra: extval("ingextra"),
                recid: extval("recidverify"),
                usrnm: usrnm,
                usrid: usrid,
            }),
        }).then(response => {
            if(response.redirected){
                window.location.href = response.url;
            }else{
                console.log('Error: Recipe not updated');
            }
        })

    }
}
function rejectIng(usrnm, usrid){
    //console.log(usrid, usrnm)
    fetch('/addrec/verify/rejectIngredient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingnameold: extval("ingnameold"),
            recid: extval("recidverify"),
        }),
    })
    window.location.href = '/addrec/verify?usrid=' + usrid + '&usrnm=' + usrnm;
}