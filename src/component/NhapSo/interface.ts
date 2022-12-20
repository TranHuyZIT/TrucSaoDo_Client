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
    NGAY: string;
    LVP_MA: number;
    VP_MA: number;
    MA_SO: number;
    SO_LUONG: number;
  }[];
}
