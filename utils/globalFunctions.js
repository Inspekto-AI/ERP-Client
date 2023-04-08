export const msToTime = milliseconds => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes %= 60;
  hours %= 24;

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const getStartAndEndDate = (dateRange, addADay) => {
  if (dateRange) {
    let start = dateRange[0].startDate;
    let end = dateRange[0].endDate;
    if (!addADay) {
      start = new Date(start).setUTCHours(18, 30, 0, 999);
      end = new Date(end).setUTCHours(41, 89, 59, 999);
    } else {
      start = new Date(start).setUTCHours(-6, 30, 0, 999);
      end = new Date(end).setUTCHours(17, 89, 59, 999);
    }
    return [start, end];
  }
  const start = new Date().setUTCHours(-6, 30, 0, 999);
  const end = new Date().setUTCHours(17, 89, 59, 999);
  return [start, end];
};
