document.addEventListener('DOMContentLoaded', () => {
    qots = [
        "Willkommen bei Lires, der Zwiebel für alle Lebenslagen.",      //49%
        "Kulilarisch.",                                                 //8%
        "Zwiebel dich ein.",                                            //5%
        "Schicht für Schicht zu einem Gericht.",                        //5%   
        "Unsere Rezepte rühren.",                                       //5%
        "Beste Rezepte von besten Menschen.",                           //5%                               
        "Keine Zwiebeltränen hier :)",                                  //4%             
        "Leckere Ideen. Reichlich Essen. Sorglos genießen.",            //4%
        "Hier gibts keine Diät.",                                       //4%
        "Schale ab, Geschmack dran.",                                   //3%
        "Manche Rezepte muss man rühren - andere gehen direkt ins Herz.",//3%
        "Iss lieber was richtiges.",                                    //2%
        "Wo Geschmack in Schichten kommt.",                             //2%
        "Regenwurmsalat!"                                               //1%
    ]
    const rLQ = document.getElementById('randomLoginQot'); 
    function getRandomQuote(quotes) {
        const percentages = [49, 8, 5, 5, 5, 5, 4, 4, 4, 3, 3, 2, 2, 1];
        const total = percentages.reduce((sum, p) => sum + p, 0);
        const random = Math.random() * total;
        
        let cumulative = 0;
        for (let i = 0; i < quotes.length; i++) {
            cumulative += percentages[i];
            if (random < cumulative) {
                return quotes[i];
            }
        }
    }

    rLQ.textContent = getRandomQuote(qots);
    const centerdiv = document.getElementById('centerDiv');
    const reger = document.getElementById('regerror');
    const logerr = document.getElementById('loginerror');


    const url = new URLSearchParams(window.location.search);
    const islogin = url.get('islogin');
    const message = url.get('message');

    centerdiv.style.display = 'none';
    reger.style.display = 'none';
    logerr.style.display = 'none';

    if (islogin === 'false') {
        centerdiv.style.display = 'block';
        reger.style.display = 'block';
        reger.textContent = message;
    } else if (islogin === 'true') {
        centerdiv.style.display = 'block';
        logerr.style.display = 'block';
        logerr.textContent = message;
    }
});


