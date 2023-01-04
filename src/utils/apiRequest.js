import axios from "axios";
import { convertDateString } from "./commonUtils";

const LOCAL = "http://localhost:8800";
const PRODUCTION = "https://trucsaodo.onrender.com";

export const getAllViPham = async (setData, lvp = "") => {
  try {
    const result = await axios.get(`${PRODUCTION}/category/vipham?lvp=${lvp}`);
    setData(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllLoaiViPham = async (setData, lvp = null) => {
  try {
    const result = await axios.get(`${PRODUCTION}/category/loaivipham`);
    setData(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllLop = async (setData) => {
  try {
    const result = await axios.get(`${PRODUCTION}/category/lop`);
    setData(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTuan = async (setData) => {
  try {
    const result = await axios.get(`${PRODUCTION}/category/tuan`);
    setData(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const findSo = async (l_ten, tuan, setData, size = "") => {
  try {
    const soResult = await axios.get(
      `${PRODUCTION}/socodo/search?l_ten=${l_ten}&tuan=${tuan}&size=${size}`
    );
    if (setData) setData(soResult.data);
    return soResult.data;
  } catch (error) {
    console.log(error);
  }
};

export const findSoAndAllDetails = async (l_ten, tuan, setData, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const soResult = await axios.get(
      `${PRODUCTION}/socodo/search?l_ten=${l_ten}&tuan=${tuan}`
    );
    if (soResult.data.length === 0) {
      if (setLoading) setLoading(false);
      if (setData) setData({ msg: "Not Found", info: null });
      return false;
    }
    const chiTietSoResult = await axios.get(
      `${PRODUCTION}/socodo/chitietscd?ma_so=${soResult.data[0].MA_SO}`,
      { ma_so: soResult.data[0].MA_SO }
    );
    let result = [];
    for (let chitietSo of chiTietSoResult.data) {
      const dateObj = new Date(chitietSo.NGAY);
      const date = `${dateObj.getFullYear()}-${
        dateObj.getMonth() + 1
      }-${dateObj.getDate()}`;
      const ctViPhamResult = await axios.get(
        `${PRODUCTION}/chitietvipham?ngay=${date}&ma_so=${chitietSo.MA_SO}`
      );
      result.push({
        day: (dateObj.getDay() + 1) % 7,
        tenHS: chitietSo.TEN_HS_TRUC,
        vipham: ctViPhamResult.data.map((ctvp) => {
          return {
            ...ctvp,
            NGAY: date,
          };
        }),
      });
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
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const addSoCoDo = async (info, setData, setLoading) => {
  try {
    await axios.post(`${PRODUCTION}/socodo/add`, info);
    if (setLoading) setLoading(false);
    if (setData) setData(info);
  } catch (error) {
    console.log(error);
    if (setLoading) setLoading(false);
  }
};

export const saveSCDRow = async (l_ten, tuan, thu, ngayBDSo, tenHS, vipham) => {
  try {
    const SCD = await findSo(l_ten, tuan);
    const maSo = SCD[0].MA_SO;
    let ngayDate = new Date(ngayBDSo);
    ngayDate.setDate(ngayDate.getDate() + thu - 2);
    let ngay = convertDateString(ngayDate);
    const ctSCDRes = await axios.get(
      `${PRODUCTION}/socodo/chitietscd?ma_so=${maSo}&ngay=${ngay}`
    );
    if (ctSCDRes.data.length === 0) {
      await axios.post(`${PRODUCTION}/socodo/chitietscd/add`, {
        ngay: ngay,
        ma_so: +maSo,
        thu: +thu,
        tenHS: tenHS,
      });
    }
    const ctVPRes = await axios.get(
      `${PRODUCTION}/chitietvipham?ngay=${ngay}&ma_so=${maSo}`
    );
    const existedVPMa = ctVPRes.data.map((ctvp) => ctvp.VP_MA);
    for (let vp of vipham) {
      if (existedVPMa.includes(+vp.VP_MA)) {
        if (vp.SO_LUONG == 0) {
          await axios.delete(`${PRODUCTION}/chitietvipham/delete`, {
            data: {
              ngay: ngay,
              ma_so: +maSo,
              vpMa: +vp.VP_MA,
            },
          });
          continue;
        }
        await axios.put(`${PRODUCTION}/chitietvipham/update`, {
          ngay: ngay,
          ma_so: +maSo,
          vpMa: +vp.VP_MA,
          newChiTietViPham: {
            ngay: ngay,
            ma_so: +maSo,
            vpMa: +vp.VP_MA,
            soLuong: vp.SO_LUONG,
          },
        });
      } else {
        if (vp.SO_LUONG != 0) {
          await axios.post(`${PRODUCTION}/chitietvipham/add`, {
            ngay: ngay,
            ma_so: +maSo,
            vpMa: +vp.VP_MA,
            soLuong: vp.SO_LUONG,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDiemTheoTuan = async (tuan, setData) => {
  try {
    const res = await axios.get(
      `${PRODUCTION}/thongke/diemtrutuan?tuan=${tuan}`
    );
    setData(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getDiemTheoSo = async (maSo, setData) => {
  try {
    if (Array.isArray(maSo)) {
      const result = [];
      for (let ma of maSo) {
        const res = await axios.get(
          `${PRODUCTION}/thongke/diemtruso?MA_SO=${ma.MA_SO}`
        );
        result.push({ ...ma, ...res.data[0] });
      }
      setData(result);
      return;
    }
    const res = await axios.get(
      `${PRODUCTION}/thongke/diemtruso?MA_SO=${maSo}`
    );
    setData(res.data[0]);
  } catch (error) {
    console.log(error);
  }
};
