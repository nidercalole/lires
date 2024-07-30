function extval(str){return document.getElementById(str).value;}
function verifyRec(usrnm, usrid){
    fetch('/addrec/verify/verifyRecipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recid: extval("recidverify"),
            send: extval("send"),
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
function rejectRec(usrnm, usrid){
    fetch('/addrec/verify/rejectRecipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recid: extval("recidverify"),
        }),
    })
    window.location.href = '/addrec/verify?usrid=' + usrid + '&usrnm=' + usrnm;
}