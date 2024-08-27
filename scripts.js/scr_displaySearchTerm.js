document.addEventListener('DOMContentLoaded', function() {
    const searchceles = document.getElementById('searchceles2');
    const celes = getCelesParam('celes');

    if (celes) {
        searchceles.value = decodeURIComponent(celes);
    }
});
