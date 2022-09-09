const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = 0;

refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = 'disabled';
  refs.btnStop.removeAttribute('disabled');

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 500);
});

refs.btnStop.addEventListener('click', () => {
  refs.btnStop.disabled = 'disabled';
  refs.btnStart.removeAttribute('disabled');
  clearInterval(timerId);
});
