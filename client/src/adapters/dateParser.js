const dateParser = (date) => {
  const inputDate = new Date(date);
  const now = new Date();
  const timeDiff = now - inputDate;

  console.log(timeDiff);
  console.log(inputDate);
  console.log(now);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (timeDiff > week) {
    return `${Math.trunc(timeDiff / week)}w ago`;
  } else if (timeDiff > day) {
    return `${Math.trunc(timeDiff / day)}d ago`;
  } else if (timeDiff > hour) {
    return `${Math.trunc(timeDiff / hour)}h ago`;
  } else if (timeDiff > minute) {
    return `${Math.trunc(timeDiff / 60)}m ago`;
  } else {
    return `a moment ago`;
  }
};

export default dateParser;
