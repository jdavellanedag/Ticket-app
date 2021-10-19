import React, { useState } from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router";
import { useMenuState } from "../hooks/useMenuState";
import { getUserStorage } from "../helpers/getUserStorage";

const { Title, Text } = Typography;

export const Desktop = () => {
  useMenuState(false);
  const [user] = useState(getUserStorage());
  const history = useHistory();

  const getOut = () => {
    localStorage.clear();
    history.replace("/getin");
  };

  const nextTicket = () => {
    console.log(" Siguiente ticekt");
  };

  if (!user.agent || !user.desktop) {
    return <Redirect to="/getin" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agent}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">5</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={getOut}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <Text>Esta atendiendo el ticket número: </Text>
          <Text style={{ fontSize: 30 }} type="danger">
            {user.desktop}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col offset={18} span={6} align="right">
          <Button onClick={nextTicket} shape="round" type="primary">
            Siguiente
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
