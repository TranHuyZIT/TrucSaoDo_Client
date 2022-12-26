import { Card, Col, Row } from "antd";
import { useState, useEffect } from "react";
import { findSo, findSoAndAllDetails } from "../../utils/apiRequest";
import { convertDateString } from "../../utils/commonUtils";
import { scdData, TitleInfo } from "./interface";
import "./TraCuuSo.css";
import { Spin } from "antd";
import RowCarousel from "./RowCarousel";
interface ListSoCoDoProps {
  setSelectedTuan: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLop: React.Dispatch<React.SetStateAction<string>>;
  setTitleInfo: React.Dispatch<React.SetStateAction<TitleInfo>>;
  setSCDData: React.Dispatch<React.SetStateAction<scdData>>;
  selectedTuan: string;
  selectedLop: string;
}
interface SoCoDo {
  MA_SO: number;
  NGAY_BD: string;
  NGAY_KT: string;
  L_TEN: string;
  TUAN: number;
}

const ListSoCoDo: React.FC<ListSoCoDoProps> = (props) => {
  const {
    setSelectedLop,
    setSelectedTuan,
    setTitleInfo,
    setSCDData,
    selectedLop,
    selectedTuan,
  } = props;
  const [allSCD, setAllSCD] = useState<SoCoDo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const find = async () => {
      await findSo(
        selectedLop === "Tất Cả" ? "" : selectedLop,
        selectedTuan === "Tất Cả" ? "" : selectedTuan,
        setAllSCD
      );
    };
    setLoading(true);
    find();
    setLoading(false);
  }, [selectedLop, selectedTuan]);

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
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div className="listsocodo-container fadeIn">
          <Row align="middle" justify="center" gutter={16}>
            <RowCarousel allSCD={allSCD} handleCardClick={handleCardClick} />
          </Row>
        </div>
      )}
    </>
  );
};
export default ListSoCoDo;
