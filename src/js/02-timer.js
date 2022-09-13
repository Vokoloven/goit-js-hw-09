import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateTimePicker: document.querySelector('input#datetime-picker'),
  dateTimePickerButton: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
  boxTimer: document.querySelector('.timer'),
  boxFields: document.querySelectorAll('.field'),
  boxValue: document.querySelectorAll('.value'),
  boxLabel: document.querySelectorAll('.label'),
};

refs.dateTimePickerButton.disabled = true;
refs.boxTimer.style.display = 'flex';
refs.boxTimer.style.gap = '20px';

for (let i = 0; i < refs.boxFields.length; i += 1) {
  refs.boxFields[i].style.display = 'flex';
  refs.boxFields[i].style.flexDirection = 'column';
  refs.boxFields[i].style.alignItems = 'center';
  refs.boxValue[i].style.fontSize = '20px';
  refs.boxValue[i].style.color = 'red';
  refs.boxValue[i].style.fontWeight = 'bold';
  refs.boxLabel[i].style.fontSize = '10px';
  refs.boxLabel[i].style.color = 'blueviolet';
  refs.boxLabel[i].style.fontWeight = 'bold';
}

let timerId = null;

refs.dateTimePickerButton.addEventListener('click', commenceTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
        refs.dateTimePickerButton.disabled = true;
        Notify.failure('Please choose a date in the future');
      } else {
        refs.dateTimePickerButton.removeAttribute('disabled');
        const convertedSelectedDate = selectedDates[0].getTime();
        localStorage.setItem('selectedDate', convertedSelectedDate);
      }
    }
  },
};

flatpickr(refs.dateTimePicker, options);

function commenceTimer() {
  timerId = setInterval(() => {
    refs.dateTimePickerButton.disabled = true;
    const choosenDateTime = Number(localStorage.getItem('selectedDate'));
    const actualDateTime = Date.now();
    const timeDifferance = choosenDateTime - actualDateTime;

    timeConverter(convertMs(timeDifferance));
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function timeConverter({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;

  if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
    clearInterval(timerId);
    refs.dateTimePickerButton.removeAttribute('disabled');
  }
}
