function redirectHome() {
    const username = document.getElementById('usrnm').textContent
    console.log(username);
    window.location.href = '/verify/?usrnm=' + username;
}