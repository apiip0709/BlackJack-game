// Variabel untuk mengubah nilai
let aiSums = 0;
let yourSums = 0;

let hidden;
let cards;

let canHit = true;

// Variabel untuk mengambil nilai dari html
const btnStartGame = document.getElementById("btn-start");
const btnTakeCard = document.getElementById("btn-take");
const btnHoldCard = document.getElementById("btn-hold");
const btnResetCard = document.getElementById("btn-reset");

const aiSumsResult = document.getElementById("ai-sums");
const aiCardsResult = document.getElementById("ai-cards");

const yourSumsResult = document.getElementById("your-sums");
const yourCardsResult = document.getElementById("your-cards");
const yourMoney = document.getElementById("money-sums");
const inputMoney = document.getElementById("input-money");

const cardsLeft = document.getElementById("cards-left");
const result = document.getElementById("result");

// Tampilan saat di load pertama
window.onload = function () {
    buildCards();
    shuffleCards();

    cardsLeft.textContent = cards.length;
    btnTakeCard.setAttribute("disabled", true);
    btnHoldCard.setAttribute("disabled", true);
}

// Untuk membuat kartu dengan kombinasi sesuai nama file gambar
function buildCards() {
    let types = ["K", "B", "H", "S"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    cards = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            cards.push(values[j] + "-" + types[i]);
        }
    }
}

// Untuk mengacak kartu
function shuffleCards() {
    for (let i = 0; i < cards.length; i++) {
        let j = Math.floor(Math.random() * cards.length);
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

// Action dari button start
btnStartGame.addEventListener("click", function () {
    // Kondisi inputMoney 0 atau huruf
    if (isNaN(inputMoney.value) || inputMoney.value <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    // Kondisi saat teks button Start menjadi try again
    if (btnStartGame.textContent === "TRY AGAIN?") {
        // Kondisi saat uang habis
        if (yourMoney.textContent <= 0) {
            alert("Habis Uang, tobat");
            return btnStartGame.textContent = "PLAY AGAIN?";
        }

        // Kondisi saat inputMoney lebih dari uang yang dimiliki
        if (yourMoney.textContent < parseInt(inputMoney.value)) {
            alert("Uang Tidak Cukup");
            return inputMoney.value = "";
        }

        aiSums = 0;
        yourSums = 0;
        canHit = true;

        // Perulangan untuk menghapus kartu yang ada pada tampilan
        while (yourCardsResult.firstChild) {
            yourCardsResult.firstChild.remove();
        }

        while (aiCardsResult.firstChild) {
            aiCardsResult.firstChild.remove();
        }

        // Menampilkan gambar belakang kartu untuk AI
        let cardImg = document.createElement("img");
        cardImg.src = "./img/BACK.png";
        cardImg.className = "hidden-card";
        aiCardsResult.append(cardImg);

        shuffleCards();
        aiSumsResult.textContent = "";
        yourSumsResult.textContent = "";
        result.textContent = "";
        inputMoney.textContent = "";

    // Kondisi saat teks button start menjadi play again atau ketika uang habis,
    // Kembali ke kondisi awal
    } else if (btnStartGame.textContent === "PLAY AGAIN?") {
        aiSums = 0;
        yourSums = 0;
        canHit = true;

        // Perulangan untuk menghapus kartu yang ada pada tampilan
        while (yourCardsResult.firstChild) {
            yourCardsResult.firstChild.remove();
        }

        while (aiCardsResult.firstChild) {
            aiCardsResult.firstChild.remove();
        }

        // Menampilkan gambar belakang kartu untuk AI dan Your
        let myCardImg = document.createElement("img");
        myCardImg.src = "./img/BACK.png";
        myCardImg.className = "hidden-card";
        yourCardsResult.append(myCardImg);

        let cardImg = document.createElement("img");
        cardImg.src = "./img/BACK.png";
        cardImg.className = "hidden-card";
        aiCardsResult.append(cardImg);

        buildCards();
        shuffleCards();
        cardsLeft.textContent = cards.length;
        yourMoney.textContent = "50000"
        btnStartGame.textContent = "START GAME";
        aiSumsResult.textContent = "";
        yourSumsResult.textContent = "";
        result.textContent = "";
        inputMoney.value = "";
        return;

    // Kondisi teks button start selain try again dan play again 
    } else {
        // Kondisi saat inputMoney lebih dari uang yang dimiliki
        if (yourMoney.textContent < parseInt(inputMoney.value)) {
            alert("Uang Tidak Cukup");
            return inputMoney.value = "";
        }

        // Menghapus belakang kartu yang ditampilkan
        setTimeout(function () {
            document.getElementsByClassName("hidden-card")[0].remove();
        });
    }

    // Kondisi apabila sisa kartu kurang dari 4
    if (cardsLeft.textContent < 4) {
        alert("Kartu Habis Silahkan di Reset")
        return;
    } 

    btnTakeCard.disabled = false;
    btnHoldCard.disabled = false;
    inputMoney.disabled = true;
    btnStartGame.textContent = "TRY AGAIN?";
    btnStartGame.setAttribute("disabled", true);

    // Menampilkan kartu acak pada layar untuk Your sebanyak 2
    setTimeout(() => {
        for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement("img");
            let card = cards.pop();
            cardImg.src = `/img/${card}.png`;
            yourSums += getValueYourCard(card);
            yourSumsResult.textContent = yourSums;
            yourCardsResult.append(cardImg);
            cardsLeft.textContent = cards.length;
        }
    }, 200)
});

// Action dari button Take
btnTakeCard.addEventListener("click", function () {
    // Kondisi saat tidak dapat take kartu
    if (!canHit) {
        return
    };

    // Kondisi saat sisa kartu 0 atau kartu habis
    if (cardsLeft === 0) {
        alert("Kartu Habis Silahkan di Reset")
        return;
    }

    // Menampilkan tambahan kartu sebanyak 1
    let cardImg = document.createElement("img");
    let card = cards.pop();
    cardImg.src = `/img/${card}.png`;
    yourSums += getValueYourCard(card);
    yourSumsResult.textContent = yourSums;
    yourCardsResult.append(cardImg);
    cardsLeft.textContent = cards.length;

    // Kondisi saat total kartu lebih dari 21
    if (yourSums > 21) {
        btnTakeCard.disabled = true;
        btnHoldCard.disabled = true;
        btnStartGame.disabled = false;
        inputMoney.disabled = false;
        result.textContent = "YOU LOSE";
        yourMoney.textContent -= inputMoney.value;
    }
});

// Action dari button Hold
btnHoldCard.addEventListener("click", function () {
    btnHoldCard.disabled = true;
    // Menghapus belakang kartu dari AI
    setTimeout(function () {
        document.getElementsByClassName("hidden-card")[0].remove();
    }, 1000);

    // Function untuk menambahkan kartu pada AI
    function addBotCards() {
        setTimeout(function () {
            // Kondisi saat sisa kartu kurang dari 2
            if (cardsLeft < 2) {
                alert("Kartu Habis Silahkan di Reset")
                return;
            }

            // Menampilkan kartu acak pada AI sebanyak 1
            let cardImg = document.createElement("img");
            let card = cards.pop();
            cardImg.src = `/img/${card}.png`;
            aiSums += getValueAiCard(card);
            aiCardsResult.append(cardImg);
            aiSumsResult.textContent = aiSums;
            cardsLeft.textContent = cards.length;

            // Kondisi apabila total kartu AI kurang dari 16, maka auto menambahkan kartu
            if (aiSums <= 16) {
                addBotCards();
            // Kondisi saat melebihi 16, maka perbandingan nilai Your dan AI
            } else {
                canHit = false;

                let message = "";
                // Kondisi kalah Your lebih dari 21
                if (yourSums > 21) {
                    message = "You Lose!";
                    yourMoney.textContent -= inputMoney.value;
                // Kondisi menang AI lebih dari 21
                } else if (aiSums > 21) {
                    // Kondisi apakah kemenangan 21 atau kemenangan biasa
                    if (yourSums == 21) {
                        message = "You win!";
                        yourMoney.textContent = parseInt(yourMoney.textContent) + (inputMoney.value * 3 / 2);
                    } else if (yourSums < 21) {
                        message = "You win!";
                        yourMoney.textContent = parseInt(yourMoney.textContent) + parseInt(inputMoney.value);
                    }
                // Kondisi draw nilai Your dan AI sama
                } else if (yourSums == aiSums) {
                    message = "Tie!";
                // Kondisi menang kartu Your lebih tinggi dari AI
                } else if (yourSums > aiSums) {
                    // Kondisi apakah kemenangan 21 atau kemenangan biasa
                    if (yourSums == 21) {
                        message = "You win!";
                        yourMoney.textContent = parseInt(yourMoney.textContent) + (inputMoney.value * 3 / 2);
                    } else if (yourSums < 21) {
                        message = "You Win!";
                        yourMoney.textContent = parseInt(yourMoney.textContent) + parseInt(inputMoney.value);
                    }
                // Kondisi kalah kartu AI lebih tinggi dari Your
                } else if (yourSums < aiSums) {
                    message = "You Lose!";
                    yourMoney.textContent -= inputMoney.value;
                }

                result.textContent = message;
                btnStartGame.disabled = false;
                btnTakeCard.disabled = true;
                inputMoney.disabled = false;
            }
        }, 1000);
    }

    // Pemanggilan function
    addBotCards();
});

// Action dari button Reset
btnResetCard.addEventListener("click", function () {
    // Perulangan untuk menghapus semua kartu yang ditampilkan
    while (yourCardsResult.firstChild) {
        yourCardsResult.firstChild.remove();
    }

    while (aiCardsResult.firstChild) {
        aiCardsResult.firstChild.remove();
    }

    setTimeout(function () {
        // Menampilkan belakang kartu pada Your dan AI
        let myCardImg = document.createElement("img");
        myCardImg.src = "./img/BACK.png";
        myCardImg.className = "hidden-card";
        yourCardsResult.append(myCardImg);
    
        let cardImg = document.createElement("img");
        cardImg.src = "./img/BACK.png";
        cardImg.className = "hidden-card";
        aiCardsResult.append(cardImg);
    
        // Memanggil function untuk membuat dan mengacak kartu
        buildCards();
        shuffleCards();
    
        aiSumsResult.textContent = "";
        yourSumsResult.textContent = "";
        result.textContent = "";
        cardsLeft.textContent = cards.length;
        btnStartGame.disabled = false;
        btnTakeCard.setAttribute("disabled", true);
        btnHoldCard.setAttribute("disabled", true);
    }, 200);
})

// Function untuk menentukan nilai sesuai kartu yang dimiliki Your
function getValueYourCard(card) {
    let cardDetail = card.split("-");
    let value = cardDetail[0];

    if (isNaN(value)) {
        if (value == "A") {
            if (yourSums >= 11) {
                return 1
            } else if (yourSums < 11) {
                return 11;
            }
        }
        return 10;
    }

    return parseInt(value);
}

// Function untuk menentukan nilai sesuai kartu yang dimiliki AI
function getValueAiCard(card) {
    let cardDetail = card.split("-");
    let value = cardDetail[0];

    if (isNaN(value)) {
        if (value == "A") {
            if (aiSums >= 11) {
                return 1
            } else if (aiSums < 11) {
                return 11;
            }
        }
        return 10;
    }

    return parseInt(value);
}
