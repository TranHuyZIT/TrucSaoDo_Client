export interface soInnfo {
  msg: string;
  info: {
    L_ten: string;
    tuan: number;
    ngayBD: string;
    ngayKT: string;
    result: scdDataDay[];
  };
}
export interface scdDataDay {
  day: number;
  tenHS: string;
  vipham: {
    DIEM_TRU?: number;
    NGAY: string;
    LVP_MA: number;
    VP_MA: number;
    MA_SO: number;
    SO_LUONG: number;
  }[];
}

export interface vp {
  VP_MA: number;
  LVP_MA: number;
  TEN: string;
  DIEM_TRU: number;
}

export interface lvp {
  LVP_MA: number;
  TEN: string;
}
