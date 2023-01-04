import "./TraCuuSo.css";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { getAllViPham } from "../../utils/apiRequest";
import { Item, scdDataInfo, SoCoDoProps, vp } from "./interface";

const SoCoDo: React.FC<SoCoDoProps> = (props) => {
  const [form] = Form.useForm();
  const [vipham, setVipham] = useState([]);
  const [data, setData] = useState<Item[]>([]);
  const { info, titleInfo } = props;

  useEffect(() => {
    getAllViPham(setVipham);
  }, []);

  useEffect(() => {
    const originData: Item[] = [];
    for (let i = 2; i <= 6; i++) {
      originData.push({
        key: i.toString(),
        day: i,
        tenHS: "",
        data: {},
      });
    }
    for (let dataDay of info.result) {
      originData[dataDay.day - 2].tenHS = dataDay.tenHS;
      for (let ctvp of dataDay.vipham) {
        originData[dataDay.day - 2].data[`${ctvp.LVP_MA}_${ctvp.VP_MA}`] =
          ctvp.SO_LUONG;
      }
    }
    setData(originData);
  }, [info]);

  const columns = [
    {
      title: "",
      dataIndex: "day",
      width: "5%",
      editable: false,
    },
    {
      title: "NỀ NẾP",
      dataIndex: "",
      width: "35%",
      editable: true,
      children: [
        ...vipham
          .filter((vp: vp) => vp.LVP_MA == 1)
          .map((vp: vp) => {
            return {
              title: vp.TEN,
              dataIndex: ["data", `1_${vp.VP_MA}`],
              width: "5%",
              editable: true,
            };
          }),
        {
          title: "VẮNG",
          dataIndex: "",
          width: "10%",
          editable: false,
          children: [
            ...vipham
              .filter((vp: vp) => vp.LVP_MA == 3)
              .map((vp: vp) => {
                return {
                  title: vp.TEN,
                  dataIndex: ["data", `3_${vp.VP_MA}`],
                  width: "5%",
                  editable: true,
                };
              }),
          ],
        },
      ],
    },
    {
      title: "VỆ SINH",
      dataIndex: "",
      width: "40%",
      editable: true,
      children: [
        ...vipham
          .filter((vp: vp) => vp.LVP_MA == 2)
          .map((vp: vp) => {
            return {
              title: vp.TEN,
              dataIndex: ["data", `2_${vp.VP_MA}`],
              width: "5%",
              editable: true,
            };
          }),
      ],
    },
    {
      title: "Tên Học Sinh Trực",
      dataIndex: "tenHS",
      width: "10%",
      editable: true,
    },
    {
      title: "TỔNG CỘNG",
      dataIndex: "address",
      width: "5%",
      editable: false,
    },
  ];

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div className="socodo-container">
      <div className="socodo-title-container">
        <div className="socodo-heading-container">
          <h1>{`BẢNG THEO DÕI TRỰC NỀ NẾP, HỌC TẬP, VỆ SINH LỚP ${titleInfo.tenLop}`}</h1>
        </div>
        <div className="socodo-time-container">
          <h2>{`Tuần ${titleInfo.tuan} (Từ ngày ${info.ngayBD} đến ngày ${info.ngayKT})`}</h2>
        </div>
      </div>
      <Form form={form} component={false}>
        <Table
          className="socodo"
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="chitietso"
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default SoCoDo;
