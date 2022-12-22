import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  DatePicker,
  Button,
} from "antd";
import { tuan, lop, vp } from "../TraCuuSo/interface";
import { FC, useState, useEffect } from "react";
import { lvp, soInnfo } from "./interface";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { saveSCDRow } from "../../utils/apiRequest";

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;
const dateFormat = "YYYY-M-D";

interface NhapSoTableProps {
  tuanList: tuan[];
  lopList: lop[];
  vpList: vp[];
  lvpList: lvp[];
  data: soInnfo;
  setOpenNhapSoInfo: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Item {
  key: string;
  day: number;
  tenHS: string;
  data: {
    [keyData: string]: number;
  };
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string | string[];
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: inputType === "text" ? true : false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const NhapSoTable: FC<NhapSoTableProps> = (props) => {
  const { tuanList, lopList, vpList, lvpList, data, setOpenNhapSoInfo } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [scdData, setSCDData] = useState<Item[]>([]);
  const [dates, setDates] = useState<RangeValue>([
    dayjs(data.info.ngayBD, dateFormat),
    dayjs(data.info.ngayKT, dateFormat),
  ]);
  const [value, setValue] = useState<RangeValue>([
    dayjs(data.info.ngayBD, dateFormat),
    dayjs(data.info.ngayKT, dateFormat),
  ]);
  const [dateString, setDateString] = useState<{
    NGAY_BD: string;
    NGAY_KT: string;
  }>({
    NGAY_BD: "",
    NGAY_KT: "",
  });
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

  const onOpenChangeDate = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData: Item[] = [...scdData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setSCDData(newData);
        setEditingKey("");
        let vp = [];
        const currentRow = newData[index];
        for (let keyVP in currentRow.data) {
          const [LVP_MA, VP_MA] = keyVP.split("_");
          if (currentRow.data[keyVP]) {
            vp.push({ VP_MA: VP_MA, SO_LUONG: currentRow.data[keyVP] });
          } else {
            vp.push({ VP_MA: VP_MA, SO_LUONG: 0 });
          }
        }

        saveSCDRow(
          data.info.L_ten,
          data.info.tuan,
          index + 2,
          data.info.ngayBD,
          currentRow.tenHS,
          vp
        );
      } else {
        newData.push(row);
        setSCDData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    console.log(data);
    const originData: Item[] = [];
    for (let i = 2; i <= 6; i++) {
      originData.push({
        key: i.toString(),
        day: i,
        tenHS: "",
        data: {},
      });
    }
    for (let dataDay of data.info.result) {
      originData[dataDay.day - 2].tenHS = dataDay.tenHS;
      for (let ctvp of dataDay.vipham) {
        originData[dataDay.day - 2].data[`${ctvp.LVP_MA}_${ctvp.VP_MA}`] =
          ctvp.SO_LUONG;
      }
    }
    setSCDData(originData);
  }, [data]);

  return (
    <Form form={form} component={false}>
      <div className="nhaptable-heading-container">
        <div className="socodo-title-container">
          <div className="socodo-heading-container">
            <h1>{`BẢNG THEO DÕI TRỰC NỀ NẾP, HỌC TẬP, VỆ SINH LỚP ${data.info.L_ten}`}</h1>
          </div>
          <div className="socodo-time-container">
            <h2>{`Tuần ${data.info.tuan}`}</h2>
            <RangePicker
              defaultValue={[
                dayjs(data.info.ngayBD, dateFormat),
                dayjs(data.info.ngayKT, dateFormat),
              ]}
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
              onOpenChange={onOpenChangeDate}
            />
          </div>
        </div>
      </div>
      <Table
        pagination={false}
        dataSource={scdData}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      >
        <Column width="5%" dataIndex="day" title="THỨ" />
        {lvpList.map((loaiVP) => {
          return (
            <ColumnGroup key={loaiVP.LVP_MA} title={loaiVP.TEN.toUpperCase()}>
              {vpList
                .filter((vp) => vp.LVP_MA === loaiVP.LVP_MA)
                .map((vp) => {
                  return (
                    <Column
                      key={vp.VP_MA}
                      width="8%"
                      dataIndex={["data", `${vp.LVP_MA}_${vp.VP_MA}`]}
                      title={vp.TEN}
                      onCell={(record: Item) => ({
                        record,
                        inputType: "number",
                        dataIndex: ["data", `${vp.LVP_MA}_${vp.VP_MA}`],
                        title: vp.TEN,
                        editing: isEditing(record),
                      })}
                    />
                  );
                })}
            </ColumnGroup>
          );
        })}
        <Column
          title="TÊN HỌC SINH TRỰC"
          dataIndex="tenHS"
          onCell={(record: Item) => ({
            record,
            inputType: "text",
            dataIndex: "tenHS",
            title: "TÊN HỌC SINH TRỰC",
            editing: isEditing(record),
          })}
        />
        <Column title="TỔNG CỘNG" />
        <Column
          title="Chỉnh sửa"
          render={(_: any, record: Item) => {
            const editable = isEditing(record);
            return editable ? (
              <span className="row-edit-container">
                <Typography.Link onClick={() => save(record.key)}>
                  Lưu Dòng
                </Typography.Link>
                <Popconfirm
                  title="Bạn có chắc chắn muốn hủy thay đổi không?"
                  onConfirm={cancel}
                >
                  <a>Hủy Bỏ</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Chỉnh Sửa
              </Typography.Link>
            );
          }}
        />
      </Table>
      <div className="table-control-container">
        <Button
          size="large"
          ghost
          className="button"
          type="primary"
          onClick={() => {
            setOpenNhapSoInfo(true);
          }}
        >
          Quay Lại
        </Button>
        <Button size="large" className="button" danger type="primary">
          Xóa
        </Button>
        <Button size="large" className="button" type="primary">
          Lưu
        </Button>
      </div>
    </Form>
  );
};

export default NhapSoTable;
