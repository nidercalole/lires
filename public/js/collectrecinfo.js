function extck(str){return document.getElementById(str).checked;}
function extval(str){return document.getElementById(str).value;}
function exttxt(str){return document.getElementById(str).textContent;}

function collectAndSend(){
    const chooseBtn = exttxt("chooseBtn");
    const ingtabl = document.getElementById("table1").rows.length;
    const lbls = document.getElementById("lbls").getElementsByTagName('*').length;

    var labels = [];
    var ingredients = [];
    var directions = [];
    var coutfor = [extval("anzInp"), extval("anzEinhInp")]
    var kindodish = [{warm:extck("warm"), kalt:extck("kalt"), vorspeise:extck("vorspeise"), hptgrcht:extck("hptgrcht"), nchtsch:extck("nchtsch"), vgtrsch:extck("vgtrsch"), vgn:extck("vgn"), flsch:extck("flsch"), fsch:extck("fsch"), gms:extck("gms"), ndl:extck("ndl"), brt:extck("brt"), dips:extck("dips"), spp:extck("spp"), slt:extck("slt"), kchn:extck("kchn"), gbck:extck("gbck"), grtn:extck("grtn"), knsrvrt:extck("knsrvrt"), suess:extck("suess"), hrzhft:extck("hrzhft"), fngrfd:extck("fngrfd")}]

    if (chooseBtn === "Im Fließtext beschreiben") {
        directions.push({steppwise:false})
        directions.push(extval("explanation"));
    }else{
        var stepwise = document.getElementById("stepwise").getElementsByTagName('*').length;
        directions.push({steppwise:true})
        for (let i = 1; i < stepwise+1; i++) {
            const step = extval("step_" + i)
            directions.push({i, step});
        }
    }
    for (let i = 0; i < ingtabl-2; i++) {
        const ing = exttxt("resing_" + i);
        const ingamount = exttxt("resingamount_" + i);
        ingredients.push({ing, ingamount});
    }
    for (let i = 0; i < lbls; i++) {
        const lbl = exttxt("lbl_" + i);
        labels.push(lbl);
    }
    const recTitle = extval("recTitle");
    const aufwRange = extval("aufwRange");
    const zubDauInp = extval("zubDauInp");
    const krzDesc = extval("krzDesc");
};