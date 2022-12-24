import { Card, Col, Row } from "antd";
import { useState, useEffect } from "react";
import { findSo, findSoAndAllDetails } from "../../utils/apiRequest";
import { convertDateString } from "../../utils/commonUtils";
import { scdData, TitleInfo } from "./interface";
import "./TraCuuSo.css";
interface ListSoCoDoProps {
  setSelectedTuan: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLop: React.Dispatch<React.SetStateAction<string>>;
  setTitleInfo: React.Dispatch<React.SetStateAction<TitleInfo>>;
  setSCDData: React.Dispatch<React.SetStateAction<scdData>>;
}
interface SoCoDo {
  MA_SO: number;
  NGAY_BD: string;
  NGAY_KT: string;
  L_TEN: string;
  TUAN: number;
}
const { Meta } = Card;
const ListSoCoDo: React.FC<ListSoCoDoProps> = (props) => {
  const { setSelectedLop, setSelectedTuan, setTitleInfo, setSCDData } = props;
  const [allSCD, setAllSCD] = useState<SoCoDo[]>([]);
  useEffect(() => {
    findSo("", "", setAllSCD);
  }, []);

  const handleCardClick = (scd: SoCoDo) => {
    setSelectedLop(scd.L_TEN);
    setSelectedTuan("" + scd.TUAN);
    findSoAndAllDetails(scd.L_TEN, scd.TUAN, setSCDData);
    setTitleInfo({
      tenLop: scd.L_TEN,
      tuan: scd.TUAN,
    });
  };

  return (
    <Row gutter={16}>
      {allSCD?.map((scd) => {
        return (
          <Col span={5}>
            <Card
              onClick={() => {
                handleCardClick(scd);
              }}
              hoverable
              className="list-card"
              cover={
                <img
                  alt="sổ sao đỏ"
                  src="https://dtntbaolam.edu.vn/uploads/news/2018_09/logo-hddtw-chuan-2.jpg"
                />
              }
            >
              <Meta
                title={`Sổ Lớp ${scd.L_TEN} - Tuần ${scd.TUAN} - Mã Sổ ${scd.MA_SO}`}
                description={`${convertDateString(
                  scd.NGAY_BD
                )} đến ${convertDateString(scd.NGAY_KT)}`}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
export default ListSoCoDo;
