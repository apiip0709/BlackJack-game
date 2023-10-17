// Menginisialisasikan ke dalam variabel data dari html
const inputTopup = document.getElementById("input-topup");
const btnSubmit = document.getElementById("submit");
const resultTopUp = document.getElementById("result-topup")

// Action button Submit
btnSubmit.addEventListener("click", function () {
    // Kondisi inputan selain angka dan kurang dari sama dengan 0
    if (isNaN(inputTopup.value) || inputTopup.value <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    // Mengatur tambahan Your money sesuai inputan
    setTimeout(() => {
        const topupAmount = parseInt(inputTopup.value);
        const currentSums = parseInt(yourMoney.textContent);
        yourMoney.textContent = currentSums + topupAmount;

        inputTopup.value = "";
        resultTopUp.textContent = "DONE BANG :))"
    }, 1000)
});