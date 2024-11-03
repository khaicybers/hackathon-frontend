import { Table, Button, Space, message, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import FormEditUniversityEntranceExamScore from "./FormEditUniversityEntranceExamScore";
import FormAddUniversityEntranceExamScore from "./FormAddUniversityEntranceExamScore";
import universityEntranceExamScoreApi from "../api/universityEntranceExamScoreApi";

function ListUniversityEntranceExamScore() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    fetchData(pageSize, currentPage);
  }, []);

  const fetchData = async (pageSize, currentPage) => {
    const res = await universityEntranceExamScoreApi.getWithParams(
      pageSize,
      currentPage
    );
    setData(res?.universitiesEntranceExamScore);
    setCurrentPage(res?.currentPage);
    setPageSize(res?.pageSize);
    setTotal(res?.total);
  };

  const getScore = (record) => {
    if (record) {
      return record.scores;
    }
    return null;
  };

  const getSubjectGroup = (record) => {
    if (record) {
      const str = record.subjectGroup.join(", ");
      return str;
    }
    return null;
  };
  const getMajorcode = (record) => {
    if (record) {
      return record.majorCode;
    }
    return null;
  };

  const columns = [
    {
      title: "Mã trường",
      dataIndex: "universityCode",
      key: "universityCode",
    },
    {
      title: "Mã ngành",
      dataIndex: "universityEntranceExamScore",
      key: "majorCode",
      render: getMajorcode,
    },
    {
      title: "Tên ngành",
      dataIndex: "majorName",
      key: "majorName",
    },
    {
      title: "Khối ngành",
      dataIndex: "universityEntranceExamScore",
      key: "subjectGroup",
      render: getSubjectGroup,
    },
    {
      title: "Năm",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Điểm thi",
      dataIndex: "universityEntranceExamScore",
      key: "scores",
      render: getScore,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await universityEntranceExamScoreApi.deleteById(id);
      message.success("Xóa thành công");
      fetchData(pageSize, currentPage);
    } catch (err) {
      message.error("Xóa thất bại");
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form.submit();
  };
  const handleCloseAdd = () => {
    setIsModalVisibleAdd(false);
  };

  const handleTableChange = (pagination) => {
    fetchData(pagination.pageSize, pagination.current).then((data) => {
      setUniversities(data?.universities);
      setCurrentPage(data?.currentPage);
      setPageSize(data.pageSize);
      setTotal(data.total);
    });
  };

  const handleFinish = async (values) => {
    const value = {
      majorCode: values.majorCode,
      universityCode: values.universityCode,
      majorName: values.majorName,
      majorYear: values.majorYear,
      score: {
        scores: values.score,
      },
      subjectGroup: values.subjectGroup,
    };
    try {
      await universityEntranceExamScoreApi.edit(selectedRecord._id, value);
      fetchData(pageSize, currentPage);
      setIsModalVisible(false);
      message.success("Chỉnh sửa điểm thành công");
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setIsModalVisibleAdd(true)}>Thêm điểm</Button>
      <FormAddUniversityEntranceExamScore
        isModalVisibleAdd={isModalVisibleAdd}
        handleCloseAdd={handleCloseAdd}
      />
      <Table
        pagination={{
          total: total,
          current: currentPage,
          pageSize: pageSize,
        }}
        onChange={handleTableChange}
        columns={columns}
        dataSource={data}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        responsive="true"
      />
      {selectedRecord && (
        <FormEditUniversityEntranceExamScore
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          handleFinish={handleFinish}
          selectedRecord={selectedRecord}
        />
      )}
    </React.Fragment>
  );
}

export default ListUniversityEntranceExamScore;
