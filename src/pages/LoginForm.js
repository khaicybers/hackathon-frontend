import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonComponents from "../components/ButtonComponents";
import LoginImage from "../assets/login.png";

const StyledLogin = styled.div`
  padding: 100px 0 0 0;
  min-height: 70vh;
`;
const StyledImage = styled.img`
  width: 60%;
`;
const StyledForm = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledWrapImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8800/api/user/login",
        values
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      message.success("Đăng nhập thành công");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledLogin>
      <Row>
        <Col span={12} xs={24} lg={12}>
          <StyledForm>
            <Form
              onFinish={handleLogin}
              style={{ width: "400px" }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                initialValue="admin"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                initialValue="admin123"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
                wrapperCol={{
                  xs: { offset: 0, span: 24 },
                  sm: { offset: 8, span: 16 },
                }}
              >
                <ButtonComponents
                  content={"Đăng nhập"}
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                />
              </Form.Item>
            </Form>
          </StyledForm>
        </Col>
        <Col span={12} xs={24} lg={12}>
          <StyledWrapImage>
            <StyledImage src={LoginImage} />
          </StyledWrapImage>
        </Col>
      </Row>
    </StyledLogin>
  );
};

export default LoginForm;
