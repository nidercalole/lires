function redirectHome() {
    const username = document.getElementById('usrnm').textContent
    window.location.href = '/verify/?usrnm=' + username;
}