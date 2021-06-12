const timer = document.getElementById('timer');
const lines = timer.querySelector('#lines');
const fins = timer.querySelector('#fins');
const nums = timer.querySelector('#num-container');
const control = document.querySelector('.button-container #control');
const remainTime = document.querySelector('.time-container #remain-time');
const totalTime = document.querySelector('.time-container #total-time');

const endTime = 40

let intervalID = null;

let isPlay = true;

function paintLines() {
    for(let i=0; i<30; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.transform = `rotate(${i*6}deg)`;

        if (i%5 == 0) {
            line.classList.add('thick')
        }

        lines.append(line);
    }
}

function paintNumber() {
    let left = 15;
    let right = 45;

    for (let i=0; i<6; i++) {
        const numBox = document.createElement('div');
        numBox.classList.add('num-box');
        numBox.style.transform = `rotate(${i*30}deg)`;

        const spanLeft = document.createElement('span');
        const spanRight = document.createElement('span');

        const leftText = left - 5*i;
        spanLeft.textContent = leftText<0 ? 60+ leftText : leftText;
        spanRight.textContent = right - (5 * i);

        spanLeft.style.transform = `rotate(${-30*i}deg)`;
        spanRight.style.transform = `rotate(${-30*i}deg)`;

        numBox.append(spanLeft,spanRight);
        nums.append(numBox);
    }
}

function paintRemainTime() {
    for (let min=0; min<40; min++) {
        for (let sec=0; sec<60; sec++) {
            const remainFin = document.createElement('div');
            remainFin.classList.add('fin');

            const deg = min*6+sec*0.1;
            remainFin.style.transform = `rotate(${-deg}deg)`
            
            fins.append(remainFin);
        }
    }
}

function tickSec() {
    const lastFin = fins.lastChild;

    if (lastFin) {
        lastFin.remove();
        renderRemainTime();
    }
}

function play() {
    intervalID = setInterval(tickSec,100)
    isPlay = true;
    control.innerHTML = `<i class="fas fa-pause"></i>`;
}

function pause() {
    clearInterval(intervalID);
    isPlay = false;
    control.innerHTML = `<i class="fas fa-play"></i>`;
}

function onClickControl() {
    if (isPlay) {
        pause();
        
    } else {
        play();
    }
}

let remainSec = 0;
let remainMin = endTime;

function renderRemainTime() {
    if(remainMin < 0) return;

    remainTime.textContent = `
        ${remainMin < 10 ? `0${remainMin}`: remainMin}:
        ${remainSec < 10 ? `0${remainSec}`: remainSec}
    `;

    remainSec--;

    if (remainSec < 0) {
        remainSec = 59;
        remainMin--;
    }
}


function paintTime() {
    renderRemainTime();
    totalTime.textContent = `(${endTime} : 00)`;
}

if (lines) {
    paintLines();
}

if (nums) {
    paintNumber();
}

if (fins) {
    paintRemainTime();
    play();
}

if(control) {
    control.addEventListener('click', onClickControl);
}

paintTime();
