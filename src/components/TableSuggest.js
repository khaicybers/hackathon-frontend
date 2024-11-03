import React, { useState } from "react";
import axios from "axios";
import { Table, Modal, Card, Avatar, Tooltip, Drawer } from "antd";
import Meta from "antd/es/card/Meta";
import ListSuggest from "./ListSuggesst";
import {
  EnvironmentFilled,
  GlobalOutlined,
  BookOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import universityApi from "../api/universityApi";

const StyledLinkIcon = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.45);
`;
const StyledTable = styled(Table)`
  border: 3px solid;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
`;

function TableSuggest({ data }) {
  const [dataSource, setDataSource] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [university, setUniversity] = useState(null);
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  async function getCoordinatesFromAddress(address) {
    try {
      const response = await axios.get(
        "https://geocode.search.hereapi.com/v1/geocode",
        {
          params: {
            q: address,
            apiKey: process.env.REACT_APP_HEREMAP_APIKEY,
          },
        }
      );
      if (response.data.items.length === 0) {
        throw new Error("No coordinates found for this address.");
      }
      const latitude = response?.data.items[0].position.lat;
      const longitude = response?.data.items[0].position.lng;
      return { latitude, longitude };
    } catch (error) {
      console.error(error);
    }
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const tableData = data?.map((item, index) => ({
    key: item.id,
    stt: index + 1,
    major: item.majorName,
    majorCode: item.scores.majorCode,
    scores2020: item.scores.scores2020,
    scores2021: item.scores.scores2021,
    scores2022: item.scores.scores2022,
    universityName: item.universityName,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã ngành",
      dataIndex: "majorCode",
      key: "majorCode",
    },
    {
      title: "Ngành",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Điểm chuẩn năm 2020",
      dataIndex: "scores2020",
      key: "scores2020",
    },
    {
      title: "Điểm chuẩn năm 2021",
      dataIndex: "scores2021",
      key: "scores2021",
    },
    {
      title: "Điểm chuẩn năm 2022",
      dataIndex: "scores2022",
      key: "scores2022",
    },
    {
      title: "Tên trường",
      dataIndex: "universityName",
      key: "universityName",
      className: "pointer-cursor",
      onCell: (record) => {
        return {
          onClick: async () => {
            await handleGetUniversity(record.key);
            setSelectedUniversity(record);
            setIsModalVisible(true);
            const universityData = await universityApi.getById(record.key);
            const address = universityData.address;
            const coordinates = await getCoordinatesFromAddress(address);
            if (coordinates) {
              setCoordinates(coordinates);
            }
          },
        };
      },
    },
  ];
  const handleGetUniversity = async (id) => {
    const res = await universityApi.getById(id);
    setUniversity(res);
  };
  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      <StyledTable
        style={{ height: "450px" }}
        dataSource={tableData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
        responsive="true"
        className="table"
      />
      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Card
          style={{ width: "100%", marginTop: "20px" }}
          cover={
            <img
              alt="example"
              src={university?.image}
              style={{ height: "250px", objectFit: "cover" }}
            />
          }
        >
          <Meta
            avatar={<Avatar src={university?.universityLogo} />}
            title={university?.universityName}
            description={university?.address}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <StyledLinkIcon
              href={`https://www.google.com/maps/search/?api=1&query=${university?.address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Tooltip title={university?.address}>
                <EnvironmentFilled
                  style={{ fontSize: 20, cursor: "pointer" }}
                />
              </Tooltip>
            </StyledLinkIcon>
            <StyledLinkIcon
              href={university?.website}
              target="_blank"
              rel="noreferrer"
            >
              <Tooltip title={university?.website}>
                <GlobalOutlined style={{ fontSize: 20, cursor: "pointer" }} />
              </Tooltip>
            </StyledLinkIcon>
            <StyledLinkIcon
              href={university?.admissionInformation}
              target="_blank"
              rel="noreferrer"
            >
              <Tooltip title="Thông tin tuyển sinh 2023">
                <BookOutlined style={{ fontSize: 20, cursor: "pointer" }} />
              </Tooltip>
            </StyledLinkIcon>
            <Tooltip title="Gợi ý gần trường">
              <InfoCircleFilled
                style={{
                  fontSize: 20,
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, 0.45)",
                }}
                onClick={showDrawer}
              />
            </Tooltip>
          </div>
        </Card>
      </Modal>
      <Drawer title="Gợi ý" placement="right" onClose={onClose} open={open}>
        <ListSuggest coordinates={coordinates} />
      </Drawer>
    </React.Fragment>
  );
}

export default TableSuggest;
