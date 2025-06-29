document.querySelectorAll('.letter-bar span').forEach(span => {
    span.addEventListener('click', function() {
        const letter = this.getAttribute('data-letter');
        const target = document.getElementById('letter-' + letter);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});