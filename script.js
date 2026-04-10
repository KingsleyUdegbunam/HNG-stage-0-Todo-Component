import dayjs from "https://esm.sh/dayjs";
import utc from "https://esm.sh/dayjs/plugin/utc";
dayjs.extend(utc);

const dueTimeElem = document.querySelector(".due-date");

const dueLocalTime = dayjs("2026-04-16 23:59", "YYYY-MM-DD HH:mm");
const utcTime = dueLocalTime.utc().format();

dueTimeElem.setAttribute("datetime", utcTime);

const dueTimeFormatted = dayjs(utcTime).format("MMM DD,YYYY HH:mm");

const dueTimeHTML = `Due ${dueTimeFormatted}`;

console.log(dueTimeHTML);

dueTimeElem.innerHTML = dueTimeHTML;
