import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { GetIn } from "./GetIn";
import { Queue } from "./Queue";
import { CreateTicket } from "./CreateTicket";
import { Desktop } from "./Desktop";
import { UiContext } from "../context/UiContext";

const { Sider, Content } = Layout;

export const RouterPage = () => {
  const { menuState } = useContext(UiContext);

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider collapsedWidth="0" breakpoint="md" hidden={menuState}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/getin">Ingresar</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/queue">Cola</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/create">Crear ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/getin" component={GetIn} />
              <Route path="/queue" component={Queue} />
              <Route path="/create" component={CreateTicket} />
              <Route path="/desktop" component={Desktop} />
              <Redirect to="/getin" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
