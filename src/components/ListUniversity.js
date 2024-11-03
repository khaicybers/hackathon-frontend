import {
  Tooltip,
  Table,
  Space,
  Button,
  Popconfirm,
  notification,
  Input,
} from "antd";
const { Search } = Input;
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import FormEditUniversity from "./FormEditUniversity";
import UniversityDetailts from "./UniversityDetailts";
import FormAddUniversity from "./FormAddUniversity";
import universityApi from "../api/universityApi";

function ListUniversity() {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isModalVisibleModalDetailts, setIsModalVisibleModalDetailts] =
    useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleFormEdit, setIsModalVisibleFormEdit] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    fetchUniversities(pageSize, currentPage);
  }, []);

  const fetchUniversities = async (pageSize, currentPage) => {
    const res = await universityApi.getWithParams(pageSize, currentPage);
    setUniversities(res?.universities);
    setCurrentPage(res?.currentPage);
    setPageSize(res.pageSize);
    setTotal(res.total);
  };

  const handleShowDetails = async (id) => {
    const res = await universityApi.getById(id);
    setSelectedUniversity(res);
    setIsModalVisibleModalDetailts(true);
  };

  const handleEdit = async (id) => {
    const res = await universityApi.getById(id);
    setEditingUniversity(res);
    setIsModalVisibleFormEdit(true);
  };

  const searchUniversities = async (searchText) => {
    const res = await universityApi.search(searchText);
    setUniversities(res);
  };

  const handleDelete = async (id) => {
    await universityApi.deleteById(id);
    notification.success({
      message: "Xóa trường thành công",
    });
    fetchUniversities(pageSize, currentPage);
  };
  const handleOkModalDetailts = () => {
    setIsModalVisibleModalDetailts(false);
  };

  const handleCancelModalDetailts = () => {
    setIsModalVisibleModalDetailts(false);
  };

  const handleOkModalAdd = () => {
    setIsModalVisibleAdd(false);
  };

  const handleCancelModalAdd = () => {
    setIsModalVisibleAdd(false);
  };
  const columns = [
    {
      title: "Mã trường",
      dataIndex: "universityCode",
      key: "universityCode",
    },
    {
      title: "Tên trường",
      dataIndex: "universityName",
      key: "universityName",
    },
    {
      title: "Địa chỉ trường",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <Tooltip title={address}>
          <EnvironmentOutlined />
        </Tooltip>
      ),
    },
    {
      title: "Website trường",
      dataIndex: "website",
      key: "website",
      render: (website) => (
        <Tooltip title={website}>
          <LinkOutlined />
        </Tooltip>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
          />
          <Popconfirm
            title="Bạn có muốn xóa trường này ?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Chi tiết",
      key: "details",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleShowDetails(record._id)}>
          Show Details
        </Button>
      ),
    },
  ];
  const handleTableChange = (pagination) => {
    fetchUniversities(pagination.pageSize, pagination.current);
  };
  return (
    <React.Fragment>
      <UniversityDetailts
        isModalVisible={isModalVisibleModalDetailts}
        handleOk={handleOkModalDetailts}
        handleCancel={handleCancelModalDetailts}
        selectedUniversity={selectedUniversity}
      />
      <FormAddUniversity
        isModalVisibleAdd={isModalVisibleAdd}
        handleOkAdd={handleOkModalAdd}
        handleCancelAdd={handleCancelModalAdd}
      />
      <FormEditUniversity
        university={editingUniversity}
        isModalVisibleFormEdit={isModalVisibleFormEdit}
        setIsModalVisibleFormEdit={setIsModalVisibleFormEdit}
        fetchUniversities={fetchUniversities}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      <Space align="center" style={{ marginBottom: "20px" }}>
        <Search
          placeholder="Tìm kiếm trường học"
          allowClear
          onSearch={searchUniversities}
          style={{ width: 300 }}
        />
        <Button onClick={() => setIsModalVisibleAdd(!isModalVisibleAdd)}>
          Thêm trường
        </Button>
      </Space>
      <Table
        pagination={{
          total: total,
          current: currentPage,
          pageSize: pageSize,
        }}
        onChange={handleTableChange}
        rowKey="_id"
        columns={columns}
        dataSource={universities}
        style={{ backgroundColor: "#f7f7f7", marginBottom: 16 }}
        className="table-custom"
        bordered
        scroll={{ x: "max-content" }}
        responsive="true"
      />
    </React.Fragment>
  );
}

export default ListUniversity;
