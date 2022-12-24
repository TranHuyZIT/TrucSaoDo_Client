import { Col, Row, Button, message } from "antd";
import { lop, tuan, scdData, TitleInfo } from "./interface";
import { SearchOutlined, FileAddOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import SoCoDo from "./SoCoDo";
import ListSoCoDo from "./ListSoCoDo";
import {
  findSoAndAllDetails,
  getAllLop,
  getAllTuan,
} from "../../utils/apiRequest";

export default function TraCuuSo() {
  const [lopList, setLopList] = useState<lop[]>([]);
  const [tuanList, setTuanList] = useState<tuan[]>([]);

  const [selectedLop, setSelectedLop] = useState<string>("");
  const [selectedTuan, setSelectedTuan] = useState<string>("");

  const [scdData, setSCDData] = useState<scdData>({
    msg: "unset",
    info: { ngayBD: "", ngayKT: "", result: [] },
  });
  const [titleInfo, setTitleInfo] = useState<TitleInfo>({
    tenLop: "",
    tuan: 0,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Tìm thấy sổ cờ đỏ",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Không tìm thấy sổ nào được tạo",
    });
  };
  const handleChange = (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setSelected(value);
  };

  useEffect(() => {
    console.log(selectedLop, selectedTuan);
  }, [selectedLop, selectedTuan]);
  const handleSearch = async () => {
    await findSoAndAllDetails(selectedLop, selectedTuan, setSCDData);
    setTitleInfo({
      tenLop: selectedLop,
      tuan: +selectedTuan,
    });
  };

  useEffect(() => {
    getAllLop(setLopList);
    getAllTuan(setTuanList);
  }, []);

  useEffect(() => {
    if (scdData.msg == "Suceeded") success();
    else if (scdData.msg == "Not Found") error();
  }, [scdData]);

  return (
    <div className="content-container">
      {contextHolder}
      <div className="search-container">
        <Select
          placeholder="Chọn Lớp"
          style={{ width: 120 }}
          onChange={(value) => {
            handleChange(value, setSelectedLop);
          }}
          value={selectedLop || undefined}
          options={[
            {
              value: "Tất Cả",
              label: "Tất Cả",
            },
            ...lopList.map((lop) => {
              return {
                value: lop.L_TEN,
                label: `Lớp ${lop.L_TEN}`,
              };
            }),
          ]}
        />
        <Select
          placeholder="Chọn Tuần"
          style={{ width: 120 }}
          onChange={(value) => {
            handleChange(value, setSelectedTuan);
          }}
          value={selectedTuan || undefined}
          options={[
            {
              value: "Tất Cả",
              label: "Tất Cả",
            },
            ...tuanList.map((tuan) => {
              return {
                value: tuan.TUAN,
                label: `Tuần ${tuan.TUAN}`,
              };
            }),
          ]}
        />
        <Button
          style={{ backgroundColor: "var(--primaryblue)" }}
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </div>
      {selectedLop === "Tất Cả" ||
      selectedLop === "" ||
      selectedTuan === "Tất Cả" ||
      selectedTuan === "" ? (
        <ListSoCoDo
          setSelectedLop={setSelectedLop}
          setSelectedTuan={setSelectedTuan}
          setSCDData={setSCDData}
          setTitleInfo={setTitleInfo}
        />
      ) : (
        <div className="so-container">
          {scdData.msg === "Suceeded" ? (
            <SoCoDo titleInfo={titleInfo} info={scdData?.info} />
          ) : (
            scdData.msg !== "unset" && (
              <div>
                <div className="empty-result-text">Không Có Dữ Liệu</div>
                <div className="add-scd-container">
                  <Button type="primary" icon={<FileAddOutlined />}>
                    Tạo
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
