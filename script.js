/* =====================================
   OUR BLUE GARDEN
   CINEMATIC + SCRAPBOOK
===================================== */


/* =================================
   MEMORY DATA
================================= */

const memories = [

    {
        image: "foto1.jpg",
        title: "It started with a simple moment.",
        description:
            "Dan ternyata momen sederhana bisa menjadi sesuatu yang ingin kita simpan selamanya."
    },

    {
        image: "foto2.jpg",
        title: "Then we started making memories.",
        description:
            "Nggak perlu tempat yang mewah. Yang penting ada kita di dalam ceritanya."
    },

    {
        image: "foto3.jpg",
        title: "Some moments just feel different.",
        description:
            "Ada beberapa foto yang setiap dilihat lagi selalu bikin senyum sendiri."
    },

    {
        image: "foto4.jpg",
        title: "A day worth remembering.",
        description:
            "Mungkin bagi orang lain ini cuma hari biasa. Tapi buat kita, mungkin nggak sesederhana itu."
    },

    {
        image: "foto5.jpg",
        title: "A little bit of chaos.",
        description:
            "Karena hubungan tanpa ketawa gara-gara hal nggak jelas rasanya kurang lengkap."
    },

    {
        image: "foto6.jpg",
        title: "This one is special.",
        description:
            "Bukan karena fotonya sempurna, tapi karena orang di dalamnya berarti."
    },

    {
        image: "foto7.jpg",
        title: "One of my favorites.",
        description:
            "Kalau suatu hari gue diminta memilih satu kenangan untuk diulang, mungkin salah satunya ini."
    },

    {
        image: "foto8.jpg",
        title: "And here we are.",
        description:
            "Delapan foto. Banyak cerita. Dan semoga masih banyak halaman berikutnya."
    }

];


/* =================================
   ELEMENTS
================================= */

const opening =
    document.getElementById("opening");

const playBtn =
    document.getElementById("playBtn");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const filmImage =
    document.getElementById("filmImage");

const filmTitle =
    document.getElementById("filmTitle");

const filmDescription =
    document.getElementById("filmDescription");

const filmNumber =
    document.getElementById("filmNumber");

const filmLabel =
    document.getElementById("filmLabel");

const filmProgress =
    document.getElementById("filmProgress");

const filmNext =
    document.getElementById("filmNext");

const film =
    document.getElementById("film");

const garden =
    document.getElementById("garden");

const transition =
    document.getElementById("transition");

const viewer =
    document.getElementById("viewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerNumber =
    document.getElementById("viewerNumber");

const viewerTitle =
    document.getElementById("viewerTitle");


let currentFilm = 0;

let currentViewer = 0;

let musicPlaying = false;

let transitioning = false;


/* =================================
   LOADING
================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            document
                .getElementById("loading")
                .classList.add("hide");

        }, 2200);

    }
);


/* =================================
   START STORY
================================= */

playBtn.addEventListener(
    "click",
    startStory
);


function startStory() {

    opening.classList.add("hide");

    music.volume = .55;

    music.play()
        .then(() => {

            musicPlaying = true;

        })
        .catch(() => {

            musicPlaying = false;

        });

}


/* =================================
   FILM NEXT
================================= */

filmNext.addEventListener(
    "click",
    nextFilm
);


function nextFilm() {

    if (transitioning) {
        return;
    }

    transitioning = true;


    /*
        Kalau sudah foto 8,
        masuk ke Blue Garden.
    */

    if (currentFilm >= memories.length - 1) {

        transitionToGarden();

        return;
    }


    /* transition masuk */

    transition.classList.add("active");


    setTimeout(() => {

        currentFilm++;

        updateFilm();

    }, 400);


    setTimeout(() => {

        transition.classList.remove("active");

        transitioning = false;

    }, 950);

}


/* =================================
   UPDATE FILM
================================= */

function updateFilm() {

    const memory =
        memories[currentFilm];


    filmImage.style.opacity = "0";

    filmImage.style.transform =
        "scale(1.08)";


    setTimeout(() => {

        filmImage.src =
            memory.image;

        filmTitle.textContent =
            memory.title;

        filmDescription.textContent =
            memory.description;


        const number =
            String(currentFilm + 1)
                .padStart(2, "0");


        filmNumber.textContent =
            number;

        filmLabel.textContent =
            "MEMORY " + number;


        const progress =
            ((currentFilm + 1) /
            memories.length) * 100;


        filmProgress.style.width =
            progress + "%";


        filmImage.style.opacity =
            "1";

        filmImage.style.transform =
            "scale(1)";


    }, 350);

}


/* =================================
   TRANSITION TO GARDEN
================================= */

function transitionToGarden() {

    transition.classList.add("active");


    setTimeout(() => {

        /*
            Hilangkan film
            supaya garden mulai.
        */

        film.style.display = "none";

        garden.style.display = "block";


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        transition.classList.remove(
            "active"
        );


        transitioning = false;

    }, 900);

}


/* =================================
   PHOTO VIEWER
================================= */

function openPhoto(index) {

    currentViewer = index;

    updateViewer();

    viewer.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closePhoto() {

    viewer.classList.remove("active");

    document.body.style.overflow =
        "";

}


function updateViewer() {

    const photo =
        memories[currentViewer];


    viewerImage.src =
        photo.image;

    viewerImage.alt =
        photo.title;


    viewerNumber.textContent =
        "MEMORY " +
        String(currentViewer + 1)
            .padStart(2, "0");


    viewerTitle.textContent =
        photo.title;

}


function changePhoto(direction) {

    currentViewer += direction;


    if (currentViewer < 0) {

        currentViewer =
            memories.length - 1;

    }


    if (
        currentViewer >=
        memories.length
    ) {

        currentViewer = 0;

    }


    updateViewer();

}


/* =================================
   VIEWER CLICK OUTSIDE
================================= */

viewer.addEventListener(
    "click",
    event => {

        if (event.target === viewer) {

            closePhoto();

        }

    }
);


/* =================================
   KEYBOARD
================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closePhoto();

        }


        if (
            viewer.classList.contains("active")
        ) {

            if (
                event.key === "ArrowLeft"
            ) {

                changePhoto(-1);

            }


            if (
                event.key === "ArrowRight"
            ) {

                changePhoto(1);

            }

        }


        if (
            !opening.classList.contains("hide")
        ) {

            return;

        }


        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            nextFilm();

        }

    }
);


/* =================================
   MUSIC
================================= */

musicButton.addEventListener(
    "click",
    toggleMusic
);


function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.textContent =
            "♪";

    } else {

        music.play();

        musicPlaying = true;

        musicButton.textContent =
            "♫";

    }

}


/* =================================
   SWIPE
================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0]
                .screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const distance =
        touchStartX - touchEndX;


    if (
        Math.abs(distance) < 60
    ) {

        return;

    }


    if (distance > 0) {

        if (
            viewer.classList.contains(
                "active"
            )
        ) {

            changePhoto(1);

        } else {

            nextFilm();

        }

    }

}


/* =================================
   FLOATING FLOWERS
================================= */

function createFloatingFlower() {

    const flower =
        document.createElement("div");


    const types = [
        "🌷",
        "🌸",
        "💙",
        "✦"
    ];


    flower.textContent =
        types[
            Math.floor(
                Math.random() *
                types.length
            )
        ];


    flower.style.position =
        "fixed";

    flower.style.left =
        Math.random() * 100 + "vw";

    flower.style.top =
        "-30px";

    flower.style.fontSize =
        (
            Math.random() * 12 + 12
        ) + "px";

    flower.style.opacity =
        Math.random() * .4 + .2;

    flower.style.pointerEvents =
        "none";

    flower.style.zIndex =
        "10";


    const duration =
        Math.random() * 7 + 7;


    flower.animate(

        [
            {
                transform:
                    "translateY(0) rotate(0deg)"
            },

            {
                transform:
                    `
                    translateY(110vh)
                    rotate(
                        ${Math.random() * 720}deg
                    )
                    `
            }
        ],

        {
            duration:
                duration * 1000,

            easing:
                "linear"
        }

    );


    document.body.appendChild(
        flower
    );


    setTimeout(
        () => flower.remove(),
        duration * 1000
    );

}


setInterval(
    createFloatingFlower,
    1600
);


/* =================================
   PARALLAX
================================= */

document.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 700
        ) {

            return;

        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                .5
            ) * 10;


        const y =
            (
                event.clientY /
                window.innerHeight -
                .5
            ) * 10;


        const photo =
            document.querySelector(
                ".film-photo"
            );


        if (photo) {

            photo.style.transform =
                `
                rotate(-2deg)
                translate(${x}px, ${y}px)
                `;

        }

    }
);


/* =================================
   INIT
================================= */

console.log(
    "🌷💙 OUR BLUE GARDEN IS READY"
);