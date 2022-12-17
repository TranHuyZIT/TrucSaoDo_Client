import axios from "axios";
import { convertDateString } from "./commonUtils";
export const getAllViPham = async (setData) => {
  try {
    const result = await axios.get("http://localhost:8800/category/vipham");
    setData(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllLop = async (setData) => {
  try {
    const result = await axios.get("http://localhost:8800/category/lop");
    setData(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTuan = async (setData) => {
  try {
    const result = await axios.get("http://localhost:8800/category/tuan");
    setData(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const findSoAndAllDetails = async (l_ten, tuan, setData, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const soResult = await axios.get(
      `http://localhost:8800/socodo/search?l_ten=${l_ten}&tuan=${tuan}`
    );
    if (soResult.data.length == 0) {
      if (setLoading) setLoading(false);
      if (setData) setData({ msg: "Not Found", info: null });
      return;
    }
    const chiTietSoResult = await axios.get(
      `http://localhost:8800/socodo/chitietscd?ma_so=${soResult.data[0].MA_SO}`,
      { ma_so: soResult.data[0].MA_SO }
    );
    let result = [];
    for (let chitietSo of chiTietSoResult.data) {
      const dateObj = new Date(chitietSo.NGAY);
      const date = `${dateObj.getFullYear()}-${
        dateObj.getMonth() + 1
      }-${dateObj.getDate()}`;
      const ctViPhamResult = await axios.get(
        `http://localhost:8800/chitietvipham?ngay=${date}&ma_so=${chitietSo.MA_SO}`
      );
      if (ctViPhamResult.data.length > 0) {
        result.push({
          day: (dateObj.getDay() + 1) % 7,
          vipham: ctViPhamResult.data.map((ctvp) => {
            return {
              ...ctvp,
              NGAY: date,
            };
          }),
        });
      }
    }
    result = {
      msg: "Suceeded",
      info: {
        ngayBD: convertDateString(soResult.data[0].NGAY_BD),
        ngayKT: convertDateString(soResult.data[0].NGAY_KT),
        result,
      },
    };
    if (setLoading) setLoading(false);
    if (setData) setData(result);
  } catch (error) {
    console.log(error);
  }
};
