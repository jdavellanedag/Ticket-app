import React, { useContext, useState } from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useMenuState } from "../hooks/useMenuState";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const CreateTicket = () => {
  useMenuState(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const createTicket = () => {
    socket.emit("create-new-ticket", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Presione el botón para un nuevo ticket</Title>
          <Button
            type="primary"
            shape={"round"}
            icon={<DownloadOutlined />}
            size="large"
            onClick={createTicket}
          >
            Nuevo ticket
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Su número</Text>
            <Divider />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
