import { Row, Col } from "antd";
import styled from "styled-components";
import options from "../dataStatic/dataOptions";
import { useState, useEffect } from "react";
import Highlight from "../components/Highlight";
import majorApi from "../api/majorApi";
import Image from "../assets/learn.png";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const StyledInfomation = styled.div`
  padding: 150px 0 50px 0;
  @media screen and (max-width: 576px) {
    padding-top: 100px;
  }
`;

const StyledUl = styled.ul`
  list-style-position: inside;
  max-width: 100%;
  background: white;
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.15);
  padding: 0;
  margin: 0;
  border-radius: 0.1rem;
  padding: 0 20px;
  height: 85vh;
  overflow-y: scroll;
`;

const StyledLi = styled.li`
  font-family: "Gloria Hallelujah", cursive;
  font-size: 20px;
  padding: 10px 0;
  &:not(:last-child) {
    border-bottom: 1px solid lightblue;
  }
  &:first-child {
    margin-top: 1rem;
  }
  &:last-child {
    margin-bottom: 1rem;
  }
  &::marker {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='14' viewBox='0 0 50 50'%3E%3Cpath d='M46.4 16.2c-2.3-2.3-5.4-3.5-8.4-4.5-.5-.2-1.1-.3-1.6-.5-1.6-1.6-3.7-2.8-6.2-3.2-1-.2-1.9.1-2.5.6-.9-.3-1.8-.6-2.7-.8-3.2-1-6.4-1.8-9.5-.1-1 .5-1.9 1.2-2.7 2-6.4 1.4-11.7 5-12.4 12.7C0 27 1.9 31.5 4.9 34.9c.1.6.2 1.1.4 1.7 1 3.2 3.3 5.7 6.7 6.5 2.7.6 5.4-.2 7.9-1.2 3.3.4 6.7.3 9.9 0 6.5-.7 13.3-2.8 17.1-8.5 3.6-5.2 4-12.6-.5-17.2zm-17.3.9c2.1.4 4 1.7 4.7 3.8 0 .5-.1 1.1-.2 1.6-.3 1.4-.8 2.6-1.6 3.7-.7.2-1.5.1-2.3-.4-.8-.4-1.6-1-2.2-1.6-.4-.4-1.2-1.7-1.6-1.9 3.4 1.3 5.1-3 3.2-5.2zm-11.6 9.7c.2-1.9 1.1-3.9 2.3-5.5-.4 2.1.3 4.2 1.7 6 1.3 1.7 3.1 3.2 5 4.2-.2.1-.4.2-.6.4-.1 0-.1.1-.2.1-3.9.2-8.7-.8-8.2-5.2zm-6.4 3.1c.1.3.1.7.2 1 .2.6.4 1.2.7 1.8-.4-.2-.7-.5-1-.7.1-.8.1-1.4.1-2.1zm31.2-1.3c-.9 1.7-2.1 3.1-3.7 4.1 2-2.1 3.4-4.7 4-7.6.2-.7.3-1.4.3-2.1.6 1.5.5 3.3-.6 5.6z'/%3E%3C/svg%3E")
      " ";
  }
`;
const StyledWrapImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledImage = styled.img`
  height: 85vh;
  @media screen and (max-width: 576px) {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`;

function InfomationPage() {
  const [majorList, setMajorList] = useState([]);

  const handleGetAllMajor = async () => {
    const res = await majorApi.getAll();
    setMajorList(res);
  };

  useEffect(() => {
    handleGetAllMajor();
  }, []);
  return (
    <StyledInfomation className="list">
      <Row>
        <Col span={12} xs={24} lg={12}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Danh sách khối thi Việt Nam" key="1">
              <StyledUl>
                {options.map((item) => (
                  <StyledLi key={item.value}>{item.label}</StyledLi>
                ))}
              </StyledUl>
            </TabPane>
            <TabPane tab="Danh sách ngành Việt Nam" key="2">
              <StyledUl>
                {majorList.map((major) => (
                  <StyledLi key={major.majorId}> {major.majorName}</StyledLi>
                ))}
              </StyledUl>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={12} xs={24} lg={12}>
          <StyledWrapImage>
            <StyledImage src={Image} />
          </StyledWrapImage>
        </Col>
      </Row>
      <Highlight />
    </StyledInfomation>
  );
}

export default InfomationPage;
