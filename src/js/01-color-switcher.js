const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

refs.btnStart.addEventListener('click', () => {
  btnStartDisable();
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 500);
});

refs.btnStop.addEventListener('click', () => {
  btnStopDisable(timerId);
});

function btnStartDisable() {
  refs.btnStart.disabled = 'disabled';
  refs.btnStop.removeAttribute('disabled');
}
function btnStopDisable(timerId) {
  refs.btnStop.disabled = 'disabled';
  refs.btnStart.removeAttribute('disabled');
  clearInterval(timerId);
}
