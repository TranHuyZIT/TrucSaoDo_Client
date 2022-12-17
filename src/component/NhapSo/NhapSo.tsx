import { Col, Row, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import SoCoDo from "./SoCoDo";
import {
  findSoAndAllDetails,
  getAllLop,
  getAllTuan,
} from "../../utils/apiRequest";

interface tuan {
  TUAN: number;
}

interface lop {
  L_TEN: string;
  KHOI: number;
}

interface scdData {
  day: number;
  vipham: {
    NGAY: string;
    VP_MA: number;
    MA_SO: number;
    SO_LUONG: number;
  }[];
}

export default function NhapSo() {
  const [lopList, setLopList] = useState<lop[]>([]);
  const [tuanList, setTuanList] = useState<tuan[]>([]);

  const [selectedLop, setSelectedLop] = useState<string>("");
  const [selectedTuan, setSelectedTuan] = useState<string>("");

  const [scdData, setSCDData] = useState<scdData[]>([]);

  const handleChange = (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setSelected(value);
  };

  const handleSearch = () => {
    findSoAndAllDetails(selectedLop, selectedTuan, setSCDData);
  };

  useEffect(() => {
    console.log(scdData);
  }, [scdData]);

  return (
    <div className="content-container">
      <div className="search-container">
        <Select
          placeholder="Chọn Lớp"
          style={{ width: 120 }}
          onChange={(value) => {
            handleChange(value, setSelectedLop);
          }}
          options={lopList.map((lop) => {
            return {
              value: lop.L_TEN,
              label: `Lớp ${lop.L_TEN}`,
            };
          })}
        />
        <Select
          placeholder="Chọn Tuần"
          style={{ width: 120 }}
          onChange={(value) => {
            handleChange(value, setSelectedTuan);
          }}
          options={tuanList.map((tuan) => {
            return {
              value: tuan.TUAN,
              label: `Tuần ${tuan.TUAN}`,
            };
          })}
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
      <div className="so-container">
        <SoCoDo />
      </div>
    </div>
  );
}
