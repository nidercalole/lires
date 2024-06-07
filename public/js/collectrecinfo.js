function extck(str){return document.getElementById(str).checked;}
function extval(str){return document.getElementById(str).value;}

function collectAndSend(){
    const recTitle = extval("recTitle");
    const aufwRange = extval("aufwRange");
    const zubDauInp = extval("zubDauInp");
    const krzDesc = extval("krzDesc");
    const coutfor = [extval("anzInp"), extval("anzEinhInp")]
    const kindodish = [extck("warm"), extck("kalt"), extck("vorspeise"), extck("hptgrcht"), extck("nchtsch"), extck("vgtrsch"), extck("vgn"), extck("flsch"), extck("fsch"), extck("gms"), extck("ndl"), extck("brt"), extck("dips"), extck("spp"), extck("slt"), extck("kchn"), extck("gbck"), extck("grtn"), extck("knsrvrt"), extck("suess"), extck("hrzhft"), extck("fngrfd")]
    const labels = [];
    const ingredients = [];
    const directions = [];
    const extra = [];
};