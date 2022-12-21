import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { tuan, lop, vp } from "../TraCuuSo/interface";
import { FC, useState, useEffect } from "react";
import { lvp } from "./interface";

const { Column, ColumnGroup } = Table;

interface NhapSoTableProps {
  tuanList: tuan[];
  lopList: lop[];
  vpList: vp[];
  lvpList: lvp[];
}
interface Item {
  key: string;
  day: number;
  tenHS: string;
  data: {
    [keyData: string]: number;
  };
}

const originData: Item[] = [];
for (let i = 2; i <= 6; i++) {
  originData.push({
    key: i.toString(),
    day: +i,
    tenHS: `Edrward ${i}`,
    data: {
      "1_1": 5,
    },
  });
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
              required: true,
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
  const { tuanList, lopList, vpList, lvpList } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = () => {};

  return (
    <Form form={form} component={false}>
      <Table
        dataSource={originData}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      >
        <Column dataIndex="day" title="THỨ" />
        {lvpList.map((loaiVP) => {
          return (
            <ColumnGroup title={loaiVP.TEN.toUpperCase()}>
              {vpList
                .filter((vp) => vp.LVP_MA === loaiVP.LVP_MA)
                .map((vp) => {
                  return (
                    <Column
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
            inputType: "number",
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
              <span>
                <Typography.Link
                  onClick={() => save()}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            );
          }}
        />
      </Table>
    </Form>
  );
};

export default NhapSoTable;
