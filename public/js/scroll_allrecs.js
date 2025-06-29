document.querySelectorAll('.letter-bar span').forEach(span => {
    span.addEventListener('click', function() {
        const letter = this.getAttribute('data-letter');
        const target = document.getElementById('letter-' + letter);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tablePos h2').forEach(function(h2) {
        const table = h2.nextElementSibling;
        if (table && table.tagName === 'TABLE') {
            if (table.querySelectorAll('tr').length === 0) {
                h2.style.display = 'none';
                table.style.display = 'none';
            }
        }
    });
});
