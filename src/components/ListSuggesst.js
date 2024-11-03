import { Tabs, List, Avatar } from "antd";
import React, { useState, useEffect } from "react";
import EatImage from "../assets/eat.png";
import HomeImage from "../assets/home.png";
import fetchPlaces from "../api/placesApi";
import styled from "styled-components";

const { TabPane } = Tabs;

const StyledLink = styled.a`
  color: gray;
`;

const ListSuggest = ({ coordinates }) => {
  const [places, setPlaces] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    const latitude = coordinates?.latitude;
    const longitude = coordinates?.longitude;
    let q = "";
    if (activeTab === "1") {
      q = "nhà trọ";
    } else {
      q = "quán cơm";
    }
    fetchPlaces(latitude, longitude, q, setPlaces);
  }, [coordinates, activeTab]);

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <Tabs defaultActiveKey="1" onTabClick={handleTabClick}>
      <TabPane tab="Nhà trọ" key="1">
        <List
          itemLayout="horizontal"
          dataSource={places}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={HomeImage} />}
                title={item?.title}
                description={
                  <StyledLink
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      item?.description
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.description}
                  </StyledLink>
                }
              />
            </List.Item>
          )}
        />
      </TabPane>
      <TabPane tab="Quán cơm" key="2">
        <List
          itemLayout="horizontal"
          dataSource={places}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={EatImage} />}
                title={item?.title}
                description={
                  <StyledLink
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      item?.description
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.description}
                  </StyledLink>
                }
              />
            </List.Item>
          )}
        />
      </TabPane>
    </Tabs>
  );
};

export default ListSuggest;
