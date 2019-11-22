const getDayCount = (s, e) => {
  const startDate = new Date(s);
  const endDate = new Date(e);
  const dayCount = Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24;

  return Math.floor(dayCount);
};

const getAllDaysBetween = (s, e) => {
  const dateArray = [];
  const dayCount = getDayCount(s, e);
  const startDate = new Date(s);
  dateArray.push(new Date(startDate));
  for (let i = 1; i <= dayCount; i += 1) {
    dateArray.push(new Date(startDate.getTime() + i * 60 * 60 * 24 * 1000));
  }
  return dateArray;
};

const getBarLength = (timelineStartDate, startDate, endDate, columnWidth) => {
  let marginLeft = 0;
  let length = 0;

  marginLeft = getDayCount(timelineStartDate, startDate) * (columnWidth + 10);
  length = (getDayCount(startDate, endDate) + 1) * (columnWidth + 10) - 10;

  return {
    marginLeft,
    length
  };
};

export { getDayCount, getAllDaysBetween, getBarLength };
