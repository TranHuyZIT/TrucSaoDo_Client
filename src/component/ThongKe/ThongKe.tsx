import { Button, Col, Row, Select, Statistic } from "antd";
import React, { useState, useEffect } from "react";
import { getAllLop, getAllTuan, getDiemTheoTuan } from "../../utils/apiRequest";
import { lop, tuan } from "../TraCuuSo/interface";
import { ReadOutlined } from "@ant-design/icons";
import "./ThongKe.css";
import { createSearchParams, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const handleDetailClick = (lop: string, tuan: string) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        lop,
        tuan,
      }).toString(),
    });
  };

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
    <div className="thongke-container">
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
                  value={diemTruTuan[0] ? 100 - +diemTruTuan[0].DIEM_TRU : 0}
                  suffix="/ 100"
                />
              </Col>
              <Col span={6}>
                <Button
                  disabled={diemTruTuan.length === 0}
                  onClick={() => {
                    handleDetailClick(
                      diemTruTuan[0]?.L_TEN,
                      selectedTuan.TUAN.toString()
                    );
                  }}
                  type="primary"
                >
                  Xem Chi Tiết
                </Button>
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
                  value={
                    diemTruTuan[diemTruTuan.length - 1]
                      ? 100 - +diemTruTuan[diemTruTuan.length - 1].DIEM_TRU
                      : 0
                  }
                  suffix="/ 100"
                />
              </Col>
              <Col span={6}>
                <Button
                  disabled={diemTruTuan.length === 0}
                  onClick={() => {
                    handleDetailClick(
                      diemTruTuan[diemTruTuan.length - 1]?.L_TEN,
                      selectedTuan.TUAN.toString()
                    );
                  }}
                  type="primary"
                >
                  Xem Chi Tiết
                </Button>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ThongKe;
