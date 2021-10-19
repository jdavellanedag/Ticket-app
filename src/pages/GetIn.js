import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Typography, Divider } from "antd";
import { Redirect, useHistory } from "react-router-dom";
import { SaveOutlined } from "@ant-design/icons";
import { useMenuState } from "../hooks/useMenuState";
import { getUserStorage } from "../helpers/getUserStorage";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export const GetIn = () => {
  const history = useHistory();
  const [user] = useState(getUserStorage());

  useMenuState(false);

  const onFinish = ({ agent, desktop }) => {
    console.log("Success:", `${desktop} ${agent}`);
    localStorage.setItem("agent", agent);
    localStorage.setItem("desktop", desktop);
    history.push("/desktop");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user.agent && user.desktop) {
    return <Redirect to="/desktop" />;
  }

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y su número de escritorio</Text>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Agente"
          name="agent"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="desktop"
          rules={[
            {
              required: true,
              message: "Ingrese el número de escritorio",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape={"round"}>
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
