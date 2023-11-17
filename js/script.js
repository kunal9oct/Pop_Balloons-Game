let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 10;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-game-button');

function createBalloon() {
    let div = document.createElement('div');
    let random = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[random];

    random = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = random + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

    body.appendChild(div);
    animateBalloon(div);

    console.dir(div);
}

function animateBalloon(element) {
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    let interval = setInterval(frame, 12 - Math.floor(num /12) + random);

    function frame() {
        // console.log(pos);
        if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+element.dataset.number+'" ]') !==null)) {
            clearInterval(interval);
            gameOver = true;
        } else {
            pos++;
            element.style.top = windowHeight - pos + 'px';
        }
    }
}

function deleteBalloon(element) {
    element.remove();
    num++;
    updateScore();
    playPopSound();
}

function playPopSound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}

function startGame() {
    restartGame();
    let timeout = 0;

    let loop = setInterval(function() {
        timeout = Math.floor(Math.random() * 600 - 100);
        if(!gameOver && num !== total) {
            createBalloon();
        } else if (num !== total){
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';
        } else {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    }, 800 + timeout)
}

function updateScore() {
    for(let i =0; i < scores.length; i++) {
        scores[i].textContent = num;
    }
}


// !!!!!    EVENT DELEGATION     !!!!! - you can add EventListener to an existing element of a web page to respond to events or elements
// to respond to events or elements which does not exist in the web page or does not exist in starting but later exist
// example - div with class balloon does not exist from starting in html file but rather it's added by using javascript
// also EventListener doesn't work if we apply it directly on javascript made elements or elements which doesn't exist in html original file  

// event in parameter is a special object that keeps track of all actions made by a user. Like even when user click on web page, it's event
document.addEventListener('click', function(event) {
    if(event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
    }
    // console.log(event);
})

function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon');
    for( let i = 0; i < forRemoving.length; i++) {
        forRemoving[i].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
}

document.querySelector('.restart').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
})

document.querySelector('.cancel').addEventListener('click', function () {
    totalShadow.style.display = 'none';
})

startBtn.addEventListener('click', function() {
    startGame();
    document.querySelector('.bg-music').play();
    document.querySelector('.start-game-window').style.display = 'none';
})