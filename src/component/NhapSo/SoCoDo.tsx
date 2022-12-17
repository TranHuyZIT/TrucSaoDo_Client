import "./NhapSo.css";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { getAllViPham } from "../../utils/apiRequest";
import { Item, scdDataInfo, SoCoDoProps, vp } from "./interface";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
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
          style={{ margin: 0, textAlign: "center" }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập vào ${title}!`,
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

const SoCoDo: React.FC<SoCoDoProps> = (props) => {
  const [form] = Form.useForm();
  const [vipham, setVipham] = useState([]);
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const { info } = props;

  useEffect(() => {
    getAllViPham(setVipham);
  }, []);

  useEffect(() => {
    console.log(info);
    const originData: Item[] = [];
    for (let i = 2; i <= 6; i++) {
      if (info.result.length > 0) {
        originData.push({
          key: i.toString(),
          day: i,
          tenHS: "Trần Gia Huy",
          data: {
            "3_4": 2,
          },
        });
      }
    }
    setData(originData);
  }, [info]);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "day",
      width: "5%",
      editable: true,
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
              dataIndex: ["data", `3_${vp.VP_MA}`],
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
    {
      title: "Chỉnh Sửa",
      width: "10%",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="operation-link">
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <a onClick={cancel}>Hủy</a>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
            className="operation-link"
          >
            Chỉnh Sửa
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        className="socodo"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="chitietso"
        pagination={false}
      />
    </Form>
  );
};

export default SoCoDo;
