import { Col, Row, Select, Statistic } from "antd";
import React, { useState, useEffect } from "react";
import { getAllLop, getAllTuan, getDiemTheoTuan } from "../../utils/apiRequest";
import { lop, tuan } from "../TraCuuSo/interface";
import { ReadOutlined } from "@ant-design/icons";
import "./ThongKe.css";

interface DiemTruTuan {
  L_TEN: string;
  DIEM_TRU: number;
}

interface ThongKeProps {}
const ThongKe: React.FC<ThongKeProps> = (props) => {
  const [lopList, setLopList] = useState<lop[]>([]);
  const [tuanList, setTuanList] = useState<tuan[]>([]);
  const [diemTruTuan, setDiemTruTuan] = useState<DiemTruTuan[]>([]);

  const [selectedTuan, setSelectedTuan] = useState<tuan>({ TUAN: 0 });

  useEffect(() => {
    getAllTuan(setTuanList);
    getAllLop(setLopList);
  }, []);
  useEffect(() => {
    if (selectedTuan) getDiemTheoTuan(selectedTuan.TUAN, setDiemTruTuan);
  }, [selectedTuan]);
  useEffect(() => {
    console.log(diemTruTuan);
  }, [diemTruTuan]);
  return (
    <div className="content-container thongke-card">
      <div className="stat-heading-container">
        <div className="stat-title-container">
          <h1>Xem Thống Kê Các Tuần</h1>
        </div>
        <Select
          onChange={(value: string) => {
            setSelectedTuan({ TUAN: +value });
          }}
          className="stat-heading-select"
          placeholder="Chọn một tuần"
          options={tuanList.map((tuan) => {
            return {
              value: tuan.TUAN,
              label: tuan.TUAN,
            };
          })}
        />
      </div>
      <div className="stat-container">
        <section>
          <Row>
            <h2>Lớp Xuất Sắc Nhất</h2>
          </Row>
          <Row justify="center" align="middle" gutter={16}>
            <Col span={6}>
              <Statistic
                title="Lớp"
                value={diemTruTuan[0]?.L_TEN}
                prefix={<ReadOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Tổng Điểm"
                value={100 - +diemTruTuan[0]?.DIEM_TRU}
                suffix="/ 100"
              />
            </Col>
          </Row>
        </section>
        <section>
          <Row>
            <h2>Lớp Vi Phạm Nhiều Nhất</h2>
          </Row>
          <Row justify="center" align="middle" gutter={16}>
            <Col span={6}>
              <Statistic
                title="Lớp"
                value={diemTruTuan[diemTruTuan.length - 1]?.L_TEN}
                prefix={<ReadOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Tổng Điểm"
                value={100 - +diemTruTuan[diemTruTuan.length - 1]?.DIEM_TRU}
                suffix="/ 100"
              />
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default ThongKe;
