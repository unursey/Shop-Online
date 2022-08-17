import { renderWords } from "./renderWords.js";
import { renderDate } from "./renderDate.js";

export const timer = (deadline, item) => {
    const timerDays = item.querySelector(".timer__count_days");
    const timerHours = item.querySelector(".timer__count_hours");
    const timerMinutes = item.querySelector(".timer__count_minutes");
    const timerSeconds = item.querySelector(".timer__count_seconds");

    const unitsDays = item.querySelector(".timer__units_days");
    const unitsHours = item.querySelector(".timer__units_hours");
    const unitsMinutes = item.querySelector(".timer__units_minutes");
    const unitsSeconds = item.querySelector(".timer__units_seconds");
   
    const getTimeRemaining = () => {     
      // const option = {
      //   timeZone: 'Europe/Moscow',
      // };

      const dateStop = new Date(renderDate(deadline)).getTime() - 180 * 60000;
      const newdateStop = dateStop + ((- new Date().getTimezoneOffset()) * 60000);

      const dateNow = Date.now();

      const timeRemaining = (newdateStop - dateNow) / 1000;
      const days = Math.floor(timeRemaining / 60 / 60 / 24);
      const hours = Math.floor((timeRemaining / 60 / 60) % 24);
      const minutes = Math.floor((timeRemaining / 60) % 60);
      const seconds = Math.floor(timeRemaining % 60);

      return {timeRemaining, days, hours, minutes, seconds};
    };
  
    let setIn = 0;
  
    const updateClock = () => {
      let getTime = getTimeRemaining();
  
      const addZero = (number) => {
        return String(number).length === 1 ? `0${number}` : number;
      };
  
      timerDays.textContent = getTime.days;
      timerHours.textContent = addZero(getTime.hours);
      timerMinutes.textContent = addZero(getTime.minutes);
      timerSeconds.textContent = addZero(getTime.seconds);

      unitsDays.textContent =  renderWords(getTime.days, "день", "дня", "дней");
      unitsHours.textContent = renderWords(getTime.hours, "час", "часа", "часов");
      unitsMinutes.textContent = renderWords(getTime.minutes, "минута", "минуты", "минут");
      unitsSeconds.textContent = renderWords(getTime.seconds, "секунда", "секунды", "секунд");
  
      if (getTime.days <= 0) {
        item.querySelector('.timer__item_days').style.display = 'none';
        item.querySelector('.timer__item_seconds').style.display = 'block';
      }
      if (getTime.timeRemaining < 0) {
        clearInterval(setIn);

        item.remove();
        // timerSeconds.textContent = "00";
        // timerMinutes.textContent = "00";
        // timerHours.textContent = "00";
        // timerDays.textContent = '0'
      }
    };
    updateClock();
    setIn = setInterval(updateClock, 1000);
  };
  