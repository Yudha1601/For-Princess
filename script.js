var opening = document.getElementById("opening");

var openBtn = document.getElementById("openBtn");

var music = document.getElementById("music");

var musicBtn = document.getElementById("musicBtn");

var loveBtn = document.getElementById("loveBtn");

var answer = document.getElementById("answer");


/* OPEN WEBSITE */

openBtn.onclick = function() {
    
    opening.style.display = "none";
    
    music.play().catch(function() {
        
        console.log("Music tidak dapat diputar otomatis.");
        
    });
    
};


/* MUSIC */

musicBtn.onclick = function() {
    
    if (music.paused) {
        
        music.play();
        
        musicBtn.innerHTML = "♫";
        
    } else {
        
        music.pause();
        
        musicBtn.innerHTML = "▶";
        
    }
    
};


/* LOVE BUTTON */

loveBtn.onclick = function() {
    
    answer.innerHTML =
        "I knew it. I love you too. ❤️";
    
};
