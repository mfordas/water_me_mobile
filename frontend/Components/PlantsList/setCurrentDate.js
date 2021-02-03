const setCurrentDate = (date) => {
  const currentDate = date;

  const year = currentDate.getUTCFullYear();
  const month =
    currentDate.getUTCMonth() + 1 < 10
      ? `0${currentDate.getUTCMonth() + 1}`
      : currentDate.getUTCMonth();
  const day =
    currentDate.getUTCDate() < 10
      ? `0${currentDate.getUTCDate()}`
      : currentDate.getUTCDate();

  return `${year}-${month}-${day}`;
};

export default setCurrentDate;
