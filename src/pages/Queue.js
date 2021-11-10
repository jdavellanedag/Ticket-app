import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Typography, List, Card, Tag, Divider } from "antd";
import { useMenuState } from "../hooks/useMenuState";
import { SocketContext } from "../context/SocketContext";
import { getLasts } from "../helpers/getLasts";

const { Title, Text } = Typography;

export const Queue = () => {
  useMenuState(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTickets] = useState([]);

  useEffect(() => {
    socket.on("ticket-assigned", (assigned) => {
      setTickets(assigned);
    });
    return () => {
      socket.off("ticket-assigned");
    };
  }, [socket]);

  useEffect(() => {
    getLasts().then(setTickets);
  }, []);

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={ticket.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">{item.agent}</Tag>,
                    <Tag color="magenta">Escritorio: {item.desktop}</Tag>,
                  ]}
                >
                  <Title>No, {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider> Historial </Divider>
          <List
            dataSource={ticket.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio: </Text>
                      <Tag color="magenta">{item.number}</Tag>
                      <Text type="secondary">Agente: </Text>
                      <Tag color="volcano">{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
