document.addEventListener('DOMContentLoaded', () => {
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