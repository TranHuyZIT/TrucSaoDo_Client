import { Button, Card, Col, Result, Row, Select } from "antd";
import { useState, useEffect } from "react";
import {
  addSoCoDo,
  findSoAndAllDetails,
  getAllLop,
  getAllTuan,
} from "../../utils/apiRequest";
import { lop, tuan } from "../TraCuuSo/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { soInnfo } from "./interface";
interface NhapSoInfoProp {
  setSoInfo: React.Dispatch<React.SetStateAction<soInnfo>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const NhapSoInfo: React.FC<NhapSoInfoProp> = (props) => {
  const { setSoInfo, setOpen } = props;
  const [lopList, setLopList] = useState<lop[]>([]);
  const [tuanList, setTuanList] = useState<tuan[]>([]);
  const [searchInfo, setSearchInfo] = useState<soInnfo>({
    msg: "",
    info: {
      L_ten: "",
      tuan: 0,
      ngayBD: "",
      ngayKT: "",
      result: [],
    },
  });

  useEffect(() => {
    getAllLop(setLopList);
    getAllTuan(setTuanList);
  }, []);

  const [selectedLop, setSelectedLop] = useState<string>("");
  const [selectedTuan, setSelectedTuan] = useState<string>("");

  const handleChange = (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setSelected(value);
  };

  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [dateString, setDateString] = useState<{
    NGAY_BD: string;
    NGAY_KT: string;
  }>({
    NGAY_BD: "",
    NGAY_KT: "",
  });

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const isNotMonday = () => {
    return dateString.NGAY_BD && new Date(dateString.NGAY_BD).getDay() != 1;
  };
  const isNotSunday = () => {
    return dateString.NGAY_KT && new Date(dateString.NGAY_KT).getDay() != 0;
  };

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 6;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 6;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  useEffect(() => {
    const soData: soInnfo = {
      msg: "",
      info: {
        L_ten: selectedLop,
        tuan: +selectedTuan,
        ngayBD: dateString.NGAY_BD,
        ngayKT: dateString.NGAY_KT,
        result: [],
      },
    };
    setValid(false);
    if (
      soData.info.L_ten &&
      soData.info.tuan &&
      soData.info.ngayBD &&
      soData.info.ngayKT &&
      !isNotMonday() &&
      !isNotSunday()
    ) {
      setValid(true);
    }
  }, [selectedLop, selectedTuan, dateString]);

  const handleAdd = async () => {
    setLoading(true);
    await findSoAndAllDetails(selectedLop, selectedTuan, setSearchInfo);
  };
  useEffect(() => {
    if (searchInfo.msg === "") return;
    console.log(searchInfo);
    if (searchInfo.msg == "Not Found") {
      addSoCoDo({
        ngayBD: dateString.NGAY_BD,
        ngayKT: dateString.NGAY_KT,
        L_ten: selectedLop,
        tuan: selectedTuan,
      });
      setSoInfo({
        msg: "created",
        info: {
          L_ten: selectedLop,
          tuan: +selectedTuan,
          ngayBD: dateString.NGAY_BD,
          ngayKT: dateString.NGAY_KT,
          result: [],
        },
      });
    } else if (searchInfo.msg == "Suceeded") {
      setSoInfo({ ...searchInfo, msg: "found" });
    }
    setOpen(false);
    setLoading(false);
  }, [searchInfo]);

  return (
    <div className="content-container">
      <Row justify="center">
        <Col span={10}>
          <Card
            className="card"
            title={<div className="info-card-heading">Nhập Thông Tin Sổ</div>}
            bordered={false}
          >
            <Row className="card-row">
              <Col className="select-container" span={12}>
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
              </Col>
              <Col className="select-container" span={12}>
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
              </Col>
            </Row>
            <Row className="card-row" justify="center" dir="column">
              <Col span={25}>
                <RangePicker
                  status={isNotMonday() || isNotSunday() ? "warning" : ""}
                  placeholder={["Ngày Bắt Đầu", "Ngày Kết Thúc"]}
                  value={dates || value}
                  disabledDate={disabledDate}
                  onCalendarChange={(val) => setDates(val)}
                  onChange={(val, string) => {
                    setDateString({
                      NGAY_BD: string[0],
                      NGAY_KT: string[1],
                    });
                    setValue(val);
                  }}
                  onOpenChange={onOpenChange}
                />
              </Col>
              <Col span={24}>
                {isNotMonday() && (
                  <div className="date-msg">
                    Cảnh Báo: Ngày Bắt Đầu Không Là Thứ 2
                  </div>
                )}
                {isNotSunday() && (
                  <div className="date-msg">
                    Cảnh Báo: Ngày Kết Thúc Không Là Chủ Nhật
                  </div>
                )}
              </Col>
            </Row>
            <Row justify="end">
              <Button
                onClick={handleAdd}
                size="large"
                icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
                type="primary"
                disabled={!valid}
              >
                Tạo
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default NhapSoInfo;
