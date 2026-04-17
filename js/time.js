import dayjs from "https://esm.sh/dayjs";
import utc from "https://esm.sh/dayjs/plugin/utc";
dayjs.extend(utc);

const dueTimeElem = document.querySelector(".due-date");
const timeLeftElem = document.querySelector(".remaining-time");
const overdueElem = document.querySelector(".overdue-time");

// TIME LOGIC
// dueTime, Global source of truth
let dueTime;

export function toHTMLDate(utcTime) {
  const dueTimeFormatted = dayjs(utcTime).format("MMM DD,YYYY HH:mm");
  const dueTimeHTML = `Due ${dueTimeFormatted}`;
  return dueTimeHTML;
}

// Set the textContent and datetime attribute of due time elem
export function setDeadLine(newDeadline) {
  const dueLocalTime = dayjs(
    newDeadline ?? "2026-04-17 23:59",
    "YYYY-MM-DD HH:mm",
  );
  dueTime = dueLocalTime.utc().format();
  dueTimeElem.setAttribute("datetime", dueTime);
  dueTimeElem.innerHTML = toHTMLDate(dueTime);
}

// Initialize due time HTML and datetime attribute
setDeadLine();

// Engine to calculate time left and formulate right label text and display
function getDueLabel(dueTime) {
  const now = dayjs();
  const minuteLeft = dayjs(dueTime).diff(now, "minute");

  if (minuteLeft < 0) {
    const abs = Math.abs(minuteLeft);
    if (abs > 4320)
      return {
        label: "Long overdue",
        isExpired: true,
        isOverdue: true,
      };

    if (abs >= 60) {
      const hours = Math.round(abs / 60);
      return {
        label: `Overdue ${hours} hour${hours > 1 ? "s" : ""}`,
        isOverdue: true,
      };
    }
    return {
      label: `Overdue ${abs} min${abs > 1 ? "s" : ""}`,
      isOverdue: true,
    };
  }

  if (minuteLeft <= 5) return { label: "Due now" };
  if (minuteLeft <= 30) return { label: `Due in ${minuteLeft} mins` };
  if (minuteLeft <= 60) return { label: "Due soon" };
  if (minuteLeft <= 1440)
    return { label: `Due in ${Math.round(minuteLeft / 60)} hours` };
  if (minuteLeft <= 2880) return { label: "Tomorrow" };

  return { label: `${Math.round(minuteLeft / 1440)} days left` };
}

function renderDueLabel({ label, isOverdue }) {
  if (isOverdue) {
    timeLeftElem.classList.add("isHidden");
    overdueElem.classList.add("isActive");
    overdueElem.textContent = label;
  } else {
    timeLeftElem.classList.remove("isHidden");
    overdueElem.classList.remove("isActive");
    timeLeftElem.textContent = label;
  }
}

let timerId;
export function startDueLabelUpdate() {
  if (timerId || !dueTime) return;

  timerId = setInterval(() => {
    const result = getDueLabel(dueTime);
    renderDueLabel(result);

    if (result.isExpired) {
      stopDueLabelUpdate();
    }
  }, 30000);
}

export function updateDueLabelOnce() {
  if (!dueTime) return;
  const result = getDueLabel(dueTime);
  renderDueLabel(result);
}

export function stopDueLabelUpdate() {
  if (timerId !== undefined) {
    clearInterval(timerId);
    timerId = undefined;
  }
}

export function restartDueLabelSystem() {
  stopDueLabelUpdate();
  updateDueLabelOnce();
  startDueLabelUpdate();
}

export function toDateTimeLocal(isoDate) {
  return dayjs(isoDate).format("YYYY-MM-DDTHH:mm");
}
