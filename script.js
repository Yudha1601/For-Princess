const startPage = document.getElementById("startPage");
const flowerPage = document.getElementById("flowerPage");
const finalPage = document.getElementById("finalPage");

const giftButton = document.getElementById("giftButton");
const forgiveButton = document.getElementById("forgiveButton");
const restartButton = document.getElementById("restartButton");

const heartsContainer = document.getElementById("hearts");


// BUKA HADIAH
giftButton.addEventListener("click", () => {
  
  startPage.classList.add("hidden");
  flowerPage.classList.remove("hidden");
  
  createHearts(35);
});


// TOMBOL SUDAH GA NGAMBEK
forgiveButton.addEventListener("click", () => {
  
  flowerPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  
  createHearts(60);
});


// LIHAT BUNGA LAGI
restartButton.addEventListener("click", () => {
  
  finalPage.classList.add("hidden");
  flowerPage.classList.remove("hidden");
  
  createHearts(25);
});


// MEMBUAT HATI BETERBANGAN
function createHeart() {
  
  const heart = document.createElement("div");
  
  heart.classList.add("heart");
  
  const heartTypes = ["💙", "🤍", "💙", "🤍", "💙"];
  
  heart.innerHTML =
    heartTypes[Math.floor(Math.random() * heartTypes.length)];
  
  
  // POSISI ACAK
  heart.style.left = Math.random() * 100 + "vw";
  
  
  // UKURAN ACAK
  heart.style.fontSize =
    Math.random() * 25 + 18 + "px";
  
  
  // KECEPATAN ACAK
  heart.style.animationDuration =
    Math.random() * 4 + 5 + "s";
  
  
  heartsContainer.appendChild(heart);
  
  
  // HAPUS SETELAH ANIMASI SELESAI
  setTimeout(() => {
    heart.remove();
  }, 9000);
}


// MEMBUAT BANYAK HATI
function createHearts(amount) {
  
  for (let i = 0; i < amount; i++) {
    
    setTimeout(() => {
      createHeart();
    }, i * 100);
    
  }
}


// HATI TERUS MUNCUL DI BACKGROUND
setInterval(() => {
  createHeart();
}, 1800);
