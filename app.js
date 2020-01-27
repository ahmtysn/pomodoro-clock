let countDown; // The id of the setInternal that I used

const form = document.customForm;
const upArrow = document.getElementById('up');
const arrangeTime = document.getElementById('arrangeTime');
const downArrow = document.getElementById('down');

const endTextDisplay = document.getElementById('end');
const minDisplay = document.getElementById('min');
const secDisplay = document.getElementById('sec');

const endTimeDisplay = document.querySelector('.timeEnd'); // with calculating it will show the finish time
const play = document.getElementById('play');
const stop = document.getElementById('stop');

const audioClick = document.getElementById('click');
const audioFinish = document.getElementById('finish');

function timer(seconds) {
  // It is main function
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;

  countDown = setInterval(function() {
    if (seconds > 0) {
      seconds--;
      display(seconds);
    } else {
      audioFinish.play();
      endTextDisplay.style.visibility = 'visible';
      setTimeout(() => {
        endTextDisplay.style.visibility = 'hidden';
      }, 3000);
      arrangeTime.textContent = '00';
      clearInterval(countDown);
    }
  }, 1000);
  endTime(then);
}

function endTime(total) {
  const end = new Date(total); // with milliseconds it will show the real time
  const hrs = end.getHours();
  const min = end.getMinutes();
  endTimeDisplay.textContent = `End Time ${hrs < 10 ? '0' : ''}${hrs}:${min < 10 ? '0' : ''}${min}`;
}
function display(seconds) {
  const remainMinutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  minDisplay.textContent = `${remainMinutes < 10 ? '0' : ''}${remainMinutes}`;
  secDisplay.textContent = `${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
}

// updateSeconds => after event listener (pause,play) to protect value of time display
function updateSeconds() {
  const totalSeconds = +minDisplay.innerText * 60 + +secDisplay.innerText; // (+) is for parse the string to number
  return totalSeconds;
}
function plus() {
  audioClick.play();
  clearInterval(countDown);
  let remainMinutes = +arrangeTime.textContent;
  if (remainMinutes < 60) {
    arrangeTime.textContent = remainMinutes + 1; // increase one minute
    arrangeTime.textContent = `${arrangeTime.textContent < 10 ? 0 : ''}${arrangeTime.textContent}`;
    display(+arrangeTime.textContent * 60);
  } else {
    alert('You reached the max value. Thank you for your understanding.');
  }
}
function minus() {
  audioClick.play();
  clearInterval(countDown);
  let remainMinutes = +arrangeTime.textContent;
  if (remainMinutes >= 1) {
    arrangeTime.textContent = remainMinutes - 1; // decrease one minute
    arrangeTime.textContent = `${arrangeTime.textContent < 10 ? 0 : ''}${arrangeTime.textContent}`;
    display(+arrangeTime.textContent * 60);
  } else {
    alert("It's impossible! You are at the zero point!");
  }
}
function stopTimer() {
  audioClick.play();
  clearInterval(countDown);
}
function startTimer() {
  audioClick.play();
  form.minutes.value = '';
  const seconds = updateSeconds();
  timer(seconds);
}

// ************ addEventListeners *************

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (this.minutes.value > 0 && this.minutes.value <= 60) {
    const seconds = this.minutes.value * 60;
    clearInterval(countDown);
    display(seconds);
    arrangeTime.textContent = this.minutes.value;
  } else {
    alert(`Please give value between 0-60 minutes`);
  }
});
upArrow.addEventListener('click', plus);
downArrow.addEventListener('click', minus);
stop.addEventListener('click', stopTimer);
play.addEventListener('click', startTimer);
