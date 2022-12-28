import { Card, Col, Row } from "antd";
import { useState, useEffect } from "react";
import {
  findSo,
  findSoAndAllDetails,
  getDiemTheoSo,
} from "../../utils/apiRequest";
import {
  convertDateString,
  sortByDiem,
  sortByTimeStamp,
} from "../../utils/commonUtils";
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
  UPDATED_AT: string;
}
interface DiemSo {
  MA_SO: number;
  L_TEN: string;
  DIEM_TRU: number;
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
  const [diemSCD, setDiemSCD] = useState<DiemSo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const find = async () => {
      await findSo(
        selectedLop === "Tất Cả" ? "" : selectedLop,
        selectedTuan === "Tất Cả" ? "" : selectedTuan,
        setAllSCD,
        "5"
      );
    };
    setLoading(true);
    find();
    setLoading(false);
  }, [selectedLop, selectedTuan]);
  useEffect(() => {
    const findDiem = async () => {
      await getDiemTheoSo(allSCD, setDiemSCD);
    };
    findDiem();
  }, [allSCD]);
  useEffect(() => {
    console.log(diemSCD);
  }, [diemSCD]);

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
          <div className="row-container">
            <div className="row-heading-container">
              <div className="row-heading">Cập nhật gần đây</div>
            </div>
            <RowCarousel
              title="time"
              allSCD={sortByTimeStamp(allSCD)}
              handleCardClick={handleCardClick}
            />
          </div>
          <div className="row-container">
            <div className="row-heading-container">
              <div className="row-heading">Vi phạm nhiều nhất</div>
            </div>
            <RowCarousel
              title="mark"
              allSCD={sortByDiem(diemSCD)}
              handleCardClick={handleCardClick}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default ListSoCoDo;
