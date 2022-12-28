export const convertDateString = (NGAY) => {
  const dateObj = new Date(NGAY);
  const date = `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
  return date;
};

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

export const sortByTimeStamp = (arr) => {
  const arrCopy = [...arr];
  arrCopy.sort(function (x, y) {
    return toTimestamp(y.UPDATED_AT) - toTimestamp(x.UPDATED_AT);
  });

  return arrCopy;
};

export const sortByDiem = (arr) => {
  arr.sort((x, y) => +y.DIEM_TRU - +x.DIEM_TRU);
  return arr;
};
