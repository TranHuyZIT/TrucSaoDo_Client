import NhapSoInfo from "./NhapSoInfo";
import "./NhapSo.css";
import { useEffect, useState } from "react";
import { lvp, soInnfo, vp } from "./interface";
import { message } from "antd";
import {
  addSoCoDo,
  getAllLoaiViPham,
  getAllViPham,
} from "../../utils/apiRequest";
import { lop, tuan } from "../TraCuuSo/interface";

import { getAllLop, getAllTuan } from "../../utils/apiRequest";
import NhapSoTable from "./NhapSoTable";
export default function NhapSo() {
  const [lopList, setLopList] = useState<lop[]>([]);
  const [tuanList, setTuanList] = useState<tuan[]>([]);
  const [viPhamList, setViPhamList] = useState<vp[]>([]);
  const [loaiViPhamList, setLoaiViPhamList] = useState<lvp[]>([]);
  const [soInfo, setSoInfo] = useState<soInnfo>({
    msg: "",
    info: {
      L_ten: "",
      tuan: 0,
      ngayBD: "",
      ngayKT: "",
      result: [],
    },
  });
  const [openNhapSoInfo, setOpenNhapSoInfo] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Không tìm thấy sổ nào được tạo",
    });
  };

  const warning = (msg: string) => {
    messageApi.open({
      type: "warning",
      content: msg,
    });
  };

  useEffect(() => {
    if (soInfo.msg === "created") {
      success("Tạo sổ mới thành công!");
    } else if (soInfo.msg === "found") {
      warning("Sổ đã tồn tại, tiến hành cập nhật sổ");
    }
  }, [soInfo]);

  useEffect(() => {
    getAllLop(setLopList);
    getAllTuan(setTuanList);
    getAllViPham(setViPhamList);
    getAllLoaiViPham(setLoaiViPhamList);
  }, []);

  return (
    <div className="content-container">
      {contextHolder}
      {openNhapSoInfo ? (
        <NhapSoInfo
          tuanList={tuanList}
          lopList={lopList}
          setOpen={setOpenNhapSoInfo}
          setSoInfo={setSoInfo}
        />
      ) : (
        <NhapSoTable
          data={soInfo}
          lvpList={loaiViPhamList}
          lopList={lopList}
          tuanList={tuanList}
          vpList={viPhamList}
          setOpenNhapSoInfo={setOpenNhapSoInfo}
        />
      )}
    </div>
  );
}
