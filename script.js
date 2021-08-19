let countdown;

// Function for time left
function displayTimeLeft(seconds) {
  const timeLeft = document.querySelector('.display-time-left');
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timeLeft.textContent = display;
}

// Function for end time
function displayEndTime(timestamp) {
  const endTime = document.querySelector('.display-end-time');
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Main function - countdown
function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);

  // Miliseconds
  const now = Date.now();
  const then = now + seconds * 1000;

  // Display time for the first time
  displayTimeLeft(seconds);
  displayEndTime(then);

  // Countdown logic
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// Helper function for starting the timer
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// Buttons on click
const buttons = document.querySelectorAll('[data-time]');
buttons.forEach(button => button.addEventListener('click', startTimer));

// Custom minutes
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
