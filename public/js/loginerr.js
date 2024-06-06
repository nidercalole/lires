document.addEventListener('DOMContentLoaded', () => {
    const url = new URLSearchParams(window.location.search);
    const islogin = url.get('islogin');
    const message = url.get('message');
    console.log(islogin, message);
    if (islogin === 'false') {
        document.getElementById('regerror').textContent = message;
    } else if (islogin === 'true') {
        document.getElementById('loginerror').textContent = message;
    }
    });