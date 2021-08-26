const start_btn = document.getElementById('start_btn');
const screens = document.querySelectorAll('.screen');
const choose_strain_btns = document.querySelectorAll('.choose_strain_btn');
const game_container = document.querySelector('.game_container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const final_message = document.getElementById('final_message');
const cardib = document.getElementById("cardib");
const coronatime = document.getElementById("coronatime");
let seconds = 0;
let score = 0;
let selected_virus = {};

start_btn.addEventListener('click', () => {
	screens[0].classList.add('up');
	cardib.play();
});

choose_strain_btns.forEach(btn => {
	btn.addEventListener('click', () => {
		const img = btn.querySelector('img');
		const src = img.getAttribute('src');
		const alt = img.getAttribute('alt');
		selected_virus = {src, alt};
		screens[1].classList.add('up');
		setTimeout(createVirus, 1000);
		cardib.play();
		startGame();
	});
});

function increaseTime() {
	let m = Math.floor(seconds / 60);
	let s = seconds % 60;
	m = m < 10 ? `0${m}` : m;
	s = s < 10 ? `0${s}` : s;
	timeEl.innerHTML = `Time: ${m}:${s}`;
	seconds++;
}

function addViruses() {
	setTimeout(createVirus, 1000);
	setTimeout(createVirus, 1500);
}

function createVirus() {
	const virus = document.createElement('div');
	const { x, y } = getRandomLocation();
	virus.classList.add('virus');
	virus.style.left = `${x}px`;
	virus.style.top = `${y}px`;
	virus.innerHTML = `<img src="${selected_virus.src}" alt="${selected_virus.alt}" 
			style="transform: rotate(${Math.random() * 360}deg);"/>`;
	virus.addEventListener('click', catchVirus);
	game_container.appendChild(virus);
}

function catchVirus() {
	increaseScore();
	this.classList.add('catched');
	setTimeout(() => {
		this.remove();
	}, 2000);
	addViruses();
}

function increaseScore() {
	score++;
	if (score >= 20) {
		final_message.classList.add('visible');
	}
	scoreEl.innerHTML = `Score: ${score}`;
}

function startGame() {
	setTimeout(function() {
		coronatime.play();
	}, 1500);
	setInterval(increaseTime, 1000);
}

function getRandomLocation() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const x = Math.random() * (width - 200) + 100;
	const y = Math.random() * (height - 200) + 100;
	return {x, y};
}