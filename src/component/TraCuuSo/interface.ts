// Nhap So interface
export interface tuan {
  TUAN: number;
}

export interface lop {
  L_TEN: string;
  KHOI: number;
}

export interface scdData {
  msg: string;
  info: scdDataInfo;
}

export interface scdDataInfo {
  ngayBD: string;
  ngayKT: string;
  result: scdDataDay[];
}

export interface scdDataDay {
  day: number;
  tenHS: string;
  vipham: {
    NGAY: string;
    LVP_MA: number;
    VP_MA: number;
    MA_SO: number;
    SO_LUONG: number;
  }[];
}

// So Co Do Interface
export interface Item {
  key: string;
  day: number;
  tenHS: string;
  data: {
    [key: string]: number;
  };
}
export interface vp {
  VP_MA: number;
  TEN: string;
  DIEM_TRU: number;
  LVP_MA: number;
}

export interface SoCoDoProps {
  info: scdDataInfo;
  titleInfo: TitleInfo;
}
export interface TitleInfo {
  tenLop: string;
  tuan: number;
}
