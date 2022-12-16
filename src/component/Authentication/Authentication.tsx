import React from "react";
import "./Authentication.css";
import { Button, Checkbox, Form, Input } from "antd";

const Authentication: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="auth-container">
      <div className="auth-heading">Đăng Nhập</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form"
      >
        <Form.Item
          label="Tài Khoản"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật Khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Authentication;
