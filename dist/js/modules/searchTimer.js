import {createTimer} from "./createTimer.js";
import {timer} from "./timer.js";


export const searchTimer = () => {
    const dataTimer = document.querySelectorAll('[data-timer-deadline]');

    dataTimer.forEach((item) => {
        createTimer(item);
        const deadline = item.dataset.timerDeadline;
        timer(deadline, item);
    })

// const eacher = (arr, callback) => {

//     let count = 0;
//     setTimeout(function eacherTimer() {
//         callback(arr[count++]);
//         if(count < arr.length) {
//             setTimeout(eacherTimer)
//         }
//     })
// };

// eacher(dataTimer, item => {
//     createTimer(item);
//     const deadline = item.dataset.timerDeadline;
//     timer(deadline);
// })


};