// let currentSelectedDate = {
//     month: null,
//     time: null,
//     day: null,
// };
// let price = 77;
// let carNumber;

// function initSecondCalendar() {
//     const daysContainer = document.getElementById("daysContainer2");
//     const monthYearElement = document.getElementById("monthYear2");
//     const prevMonthButton = document.getElementById("prevMonth2");
//     const nextMonthButton = document.getElementById("nextMonth2");
//     const busyDays = [1, 5, 11, 15, 18];

//     let currentDate = new Date();
//     let monthCounter = 1;
//     let selectedDay = null;

//     function renderCalendar(date) {
//         const currentMonth = date.getMonth();
//         const currentYear = date.getFullYear();
//         const today = currentDate.getDate();
//         let activeDay = null;

//         monthYearElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

//         const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//         const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
//         const daysInMonth = lastDayOfMonth.getDate();

//         const startDay = firstDayOfMonth.getDay();

//         daysContainer.innerHTML = "";

//         const daysShort = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
//         const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

//         for (let i = 0; i < 7; i++) {
//             const dayName = document.createElement("div");
//             dayName.textContent = daysShort[i];

//             if (i < 5) {
//                 dayName.classList.add("day-text");
//             } else {
//                 dayName.classList.add("day-text", "weekend");
//             }

//             daysContainer.appendChild(dayName);
//         }

//         for (let i = 0; i < adjustedStartDay; i++) {
//             const emptyCell = document.createElement("div");
//             emptyCell.classList.add("day", "empty-block");
//             daysContainer.appendChild(emptyCell);
//         }

//         for (let i = 1; i <= daysInMonth; i++) {
//             const dayCell = document.createElement("div");
//             dayCell.classList.add("day");
//             dayCell.textContent = i;

//             let dayOfWeek = new Date(currentYear, currentMonth, i).getDay();

//             if (dayOfWeek === 0 || dayOfWeek === 6) {
//                 dayCell.classList.add("weekend");
//             }

//             if (i < today && currentMonth === new Date().getMonth()) {
//                 dayCell.classList.add("late");
//             }

//             if (
//                 selectedDay &&
//                 selectedDay.getDate() === i &&
//                 selectedDay.getMonth() === currentMonth &&
//                 selectedDay.getFullYear() === currentYear
//             ) {
//                 dayCell.classList.add("active");
//                 activeDay = dayCell;
//             }

//             dayCell.addEventListener("click", () => {
//                 if (activeDay !== null) {
//                     activeDay.classList.remove("active");
//                 }

//                 dayCell.classList.add("active");

//                 selectedDay = new Date(currentYear, currentMonth, i);
//                 activeDay = dayCell;

//                 currentSelectedDate.month = currentMonth;
//                 currentSelectedDate.day = i;
//             });

//             daysContainer.appendChild(dayCell);
//         }
//     }

//     function markBusyDays(busyDays) {
//         const allDays = Array.from(daysContainer.getElementsByClassName("day"));

//         busyDays.forEach((day) => {
//             const dayElement = allDays.find((element) => parseInt(element.textContent) === day);
//             if (dayElement) {
//                 dayElement.classList.add("busy");
//             }
//         });
//     }

//     function getMonthName(monthIndex) {
//         const monthNames = [
//             "Январь",
//             "Февраль",
//             "Март",
//             "Апрель",
//             "Май",
//             "Июнь",
//             "Июль",
//             "Август",
//             "Сентябрь",
//             "Октябрь",
//             "Ноябрь",
//             "Декабрь",
//         ];
//         return monthNames[monthIndex];
//     }

//     function updateButtons() {
//         if (monthCounter >= 3) {
//             nextMonthButton.classList.add("disable");
//         } else {
//             nextMonthButton.classList.remove("disable");
//         }

//         if (monthCounter <= 1) {
//             prevMonthButton.classList.add("disable");
//         } else {
//             prevMonthButton.classList.remove("disable");
//         }
//     }

//     prevMonthButton.addEventListener("click", () => {
//         if (monthCounter > 1) {
//             monthCounter--;
//             currentDate.setMonth(currentDate.getMonth() - 1);
//             renderCalendar(currentDate);
//             updateButtons();

//             markBusyDays(busyDays);
//         }
//     });

//     nextMonthButton.addEventListener("click", () => {
//         if (monthCounter < 3) {
//             monthCounter++;
//             currentDate.setMonth(currentDate.getMonth() + 1);
//             renderCalendar(currentDate);
//             updateButtons();

//             markBusyDays(busyDays);
//         }
//     });

//     renderCalendar(currentDate);
//     updateButtons();

//     markBusyDays(busyDays);
// }

// initSecondCalendar();