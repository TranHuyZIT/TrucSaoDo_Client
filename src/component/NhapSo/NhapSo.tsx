import { Col, Row, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { Select } from "antd";
import SoCoDo from "./SoCoDo";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export default function NhapSo() {
  return (
    <div className="content-container">
      <div className="search-container">
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "disabled",
              disabled: true,
              label: "Disabled",
            },
            {
              value: "Yiminghe",
              label: "yiminghe",
            },
          ]}
        />
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "disabled",
              disabled: true,
              label: "Disabled",
            },
            {
              value: "Yiminghe",
              label: "yiminghe",
            },
          ]}
        />
        <Button
          style={{ backgroundColor: "var(--primaryblue)" }}
          type="primary"
          icon={<SearchOutlined />}
        >
          Tìm kiếm
        </Button>
      </div>
      <div className="so-container">
        <SoCoDo />
      </div>
    </div>
  );
}
