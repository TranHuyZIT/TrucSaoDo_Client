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
import { useSearchParams } from "react-router-dom";
import { Empty } from "antd";
export default function TraCuuSo() {
  const [lopList, setLopList] = useState<lop[]>([]);
  const [tuanList, setTuanList] = useState<tuan[]>([]);

  const [selectedLop, setSelectedLop] = useState<string>("");
  const [selectedTuan, setSelectedTuan] = useState<string>("");
  const [searchParams] = useSearchParams();

  const [scdData, setSCDData] = useState<scdData>({
    msg: "unset",
    info: { ngayBD: "", ngayKT: "", result: [] },
  });
  const [titleInfo, setTitleInfo] = useState<TitleInfo>({
    tenLop: "",
    tuan: 0,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const lopParam = searchParams.get("lop");
  const tuanParam = searchParams.get("tuan");

  useEffect(() => {
    const find = async (lop: string, tuan: string) => {
      await findSoAndAllDetails(lop, +tuan, setSCDData);
      setTitleInfo({
        tenLop: selectedLop,
        tuan: +selectedTuan,
      });
    };
    if (lopParam) setSelectedLop(lopParam);
    if (tuanParam) setSelectedTuan(tuanParam);
    if (lopParam && tuanParam) {
      find(lopParam, tuanParam);
    }
  }, [lopParam, tuanParam]);

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

  const handleSearch = async () => {
    if (selectedLop === "Tất Cả" || selectedTuan === "Tất Cả") return;
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
          disabled={selectedLop === "Tất Cả" && selectedTuan === "Tất Cả"}
        >
          Tìm kiếm
        </Button>
      </div>
      {scdData.msg === "unset" ||
      selectedLop === "Tất Cả" ||
      selectedTuan === "Tất Cả" ? (
        <ListSoCoDo
          setSelectedLop={setSelectedLop}
          setSelectedTuan={setSelectedTuan}
          setSCDData={setSCDData}
          setTitleInfo={setTitleInfo}
          selectedLop={selectedLop}
          selectedTuan={selectedTuan}
        />
      ) : (
        <div className="so-container fadeIn">
          {scdData.msg === "Suceeded" ? (
            <SoCoDo titleInfo={titleInfo} info={scdData?.info} />
          ) : (
            scdData.msg !== "unset" && (
              <div>
                <Empty />
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
