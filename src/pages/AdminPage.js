import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Major from "../components/Major";
import ListUniversity from "../components/ListUniversity";
import ListUniversityEntranceExamScore from "../components/ListUniversityEntranceExamScore";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Modal } from "antd";
const { Header, Sider, Content } = Layout;
import items from "../dataStatic/menuAdmin";

const StyledLogo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`;
const StyledTrigger = styled.div`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState(<ListUniversity />);
  const components = [
    <ListUniversity />,
    <Major />,
    <ListUniversityEntranceExamScore />,
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/dang-nhap");
    }
  }, [isLoggedIn, navigate]);

  function handleOk() {
    localStorage.removeItem("token");
    setIsModalVisible(false);
    navigate("/dang-nhap");
  }

  function handleMenuClick(e) {
    if (e.key === "4") {
      setIsModalVisible(true);
    } else {
      setContent(components[e.key - 1]);
    }
  }
  function handleOk() {
    localStorage.removeItem("token");
    setIsModalVisible(false);
    navigate("/dang-nhap");
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <StyledLogo />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "#fff" }}>
          <StyledTrigger onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </StyledTrigger>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100vh",
            background: "#fff",
            overflowY: "scroll",
          }}
        >
          {content}
        </Content>
      </Layout>
      <Modal
        title="Xác nhận đăng xuất"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>
    </Layout>
  );
}

export default AdminPage;
