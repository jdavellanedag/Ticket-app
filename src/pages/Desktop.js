import React, { useContext, useState } from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router";
import { useMenuState } from "../hooks/useMenuState";
import { getUserStorage } from "../helpers/getUserStorage";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const Desktop = () => {
  useMenuState(false);
  const [user] = useState(getUserStorage());
  const [ticket, setTicket] = useState(null);
  const { socket } = useContext(SocketContext);
  const history = useHistory();

  const getOut = () => {
    localStorage.clear();
    history.replace("/getin");
  };

  const nextTicket = () => {
    socket.emit("next-user", user, (ticketAssigned) => {
      setTicket(ticketAssigned);
    });
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
          <Text type="success">{user.desktop}</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={getOut}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket && (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket número: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
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
