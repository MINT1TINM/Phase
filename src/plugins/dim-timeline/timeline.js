const getDayCount = (s, e) => {
  let startDate = new Date(s);
  let endDate = new Date(e);
  let dayCount = Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24;
  return dayCount;
};

const getAllDaysBetween = (s, e) => {
  let dateArray = [];
  let dayCount = getDayCount(s, e);
  let startDate = new Date(s);
  dateArray.push(new Date(startDate));
  for (let i = 1; i <= dayCount; i++) {
    dateArray.push(new Date(startDate.getTime() + i * 60 * 60 * 24 * 1000));
  }
  return dateArray;
};

const getTimeRange = () => {};

const getBarLength = (timelineStartDate, startDate, endDate, columnWidth) => {
  let marginLeft = 0;
  let length = 0;

  marginLeft = getDayCount(timelineStartDate, startDate) * (columnWidth + 10);
  length = (getDayCount(startDate, endDate) + 1) * (columnWidth + 10) - 10;

  return {
    marginLeft: marginLeft,
    length: length
  };
};

export { getDayCount, getAllDaysBetween, getTimeRange, getBarLength };
