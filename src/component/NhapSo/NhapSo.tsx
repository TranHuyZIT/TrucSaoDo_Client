import NhapSoInfo from "./NhapSoInfo";
import "./NhapSo.css";
import { useEffect, useState } from "react";
import { soInnfo } from "./interface";
import { message } from "antd";
import { addSoCoDo } from "../../utils/apiRequest";

export default function NhapSo() {
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
    console.log(soInfo);
    if (soInfo.msg === "created") {
      success("Tạo sổ mới thành công!");
    } else if (soInfo.msg === "found") {
      warning("Sổ đã tồn tại, tiến hành cập nhật sổ");
    }
  }, [soInfo]);

  return (
    <div className="content-container">
      {contextHolder}
      {openNhapSoInfo ? (
        <NhapSoInfo setOpen={setOpenNhapSoInfo} setSoInfo={setSoInfo} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
