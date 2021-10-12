import React from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const CreateTicket = () => {
  const createTicket = () => {
    console.log("Nuevo ticket");
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
      <Row style={{ marginTop: 100 }}>
        <Col span={14} offset={6} align="center">
          <Text level={2}>Su número</Text>
          <Divider />
          <Text type="success" style={{ fontSize: 55 }}>
            55
          </Text>
        </Col>
      </Row>
    </>
  );
};
