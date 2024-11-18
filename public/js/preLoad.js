function updateStartAtRec(expense, difimg){

        switch(expense){
            case 1:
                difimg.src = '/img/1star.png'; 
                break;
            case 2:
                difimg.src = '/img/2star.png';
                break;
            case 3:
                difimg.src = '/img/3star.png';
                break;
            case 4:
                difimg.src = '/img/4star.png';
                break;
            case 5:
                difimg.src = '/img/5star.png';
                break;
        }
        difimg.onload =  "";
    }