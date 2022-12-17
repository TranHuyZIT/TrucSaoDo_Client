import axios from "axios";
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
    const soResult = await axios.get(
      `http://localhost:8800/socodo/search?l_ten=${l_ten}&tuan=${tuan}`
    );
    if (!soResult.data[0].MA_SO) return { msg: "Not Found" };
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
    console.log(result);
    if (setData) setData(result);
  } catch (error) {
    console.log(error);
  }
};
