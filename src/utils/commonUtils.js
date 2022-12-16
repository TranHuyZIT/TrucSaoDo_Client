export const convertDateString = (NGAY) => {
  const dateObj = new Date(NGAY);
  const date = `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
  return date;
};
