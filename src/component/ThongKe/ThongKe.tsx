import { Col, Row, Select, Statistic } from "antd";
import React, { useState, useEffect } from "react";
import { getAllLop, getAllTuan } from "../../utils/apiRequest";
import { lop, tuan } from "../TraCuuSo/interface";
import { ReadOutlined } from "@ant-design/icons";
import "./ThongKe.css";
interface ThongKeProps {}
const ThongKe: React.FC<ThongKeProps> = (props) => {
  const [lopList, setLopList] = useState<lop[]>([]);
  const [tuanList, setTuanList] = useState<tuan[]>([]);

  useEffect(() => {
    getAllTuan(setTuanList);
    getAllLop(setLopList);
  }, []);
  return (
    <div className="content-container thongke-card">
      <div className="stat-heading-container">
        <div className="stat-title-container">
          <h1>Xem Thống Kê Các Tuần</h1>
        </div>
        <Select
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
            <h2>Lớp Vi Phạm Nhiều Nhất</h2>
          </Row>
          <Row justify="center" align="middle" gutter={16}>
            <Col span={6}>
              <Statistic title="Lớp" value={"1-1"} prefix={<ReadOutlined />} />
            </Col>
            <Col span={6}>
              <Statistic title="Tổng Điểm" value={93} suffix="/ 100" />
            </Col>
          </Row>
        </section>
        <section>
          <Row>
            <h2>Lớp Xuất Sắc Nhất</h2>
          </Row>
          <Row justify="center" align="middle" gutter={16}>
            <Col span={6}>
              <Statistic title="Lớp" value={1128} prefix={<ReadOutlined />} />
            </Col>
            <Col span={6}>
              <Statistic title="Tổng Điểm" value={93} suffix="/ 100" />
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default ThongKe;
