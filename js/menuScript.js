// Untuk menampilkan popUp TopUp
function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

// Untuk menyembunyikan popUp TopUp
function hidePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';

    resultTopUp.textContent = "";
}