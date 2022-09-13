import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(refs.form[0].value);
  const delayStep = Number(refs.form[1].value);
  const position = Number(refs.form[2].value);

  delayChecker(1, delay);

  for (let i = 2; i <= position; i += 1) {
    delay += delayStep;
    delayChecker(i, delay);
  }

  function createPromise(position, delay) {
    return new Promise((resolve, rejected) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          rejected({ position, delay });
        }
      }, delay);
    });
  }

  function delayChecker(i, delay) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
