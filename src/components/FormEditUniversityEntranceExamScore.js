import { Button, Modal, Form, Input, Select } from "antd";
import { useState } from "react";
import options from "../dataStatic/dataOptions";
import yearList from "../dataStatic/dataYear";

function FormEditUniversityEntranceExamScore({
  isModalVisible,
  handleOk,
  handleCancel,
  handleFinish,
  selectedRecord,
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectChange = (values) => {
    setSelectedValues(values);
  };
  return (
    <Modal
      title="Chỉnh sửa điểm thi"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="universityEntranceExamScoreForm"
        onFinish={handleFinish}
        initialValues={{
          universityCode: selectedRecord.universityCode,
          majorName: selectedRecord.majorName,
          majorYear: selectedRecord.year,
          score: selectedRecord.universityEntranceExamScore?.scores,
          subjectGroup:
            selectedRecord.universityEntranceExamScore?.subjectGroup,
          majorCode: selectedRecord.universityEntranceExamScore?.majorCode,
        }}
      >
        <Form.Item
          label="Mã trường"
          name="universityCode"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã trường!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã ngành"
          name="majorCode"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã ngành!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên ngành"
          name="majorName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên ngành!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="subjectGroup"
          label="Khối xét tuyển"
          rules={[{ required: true, message: "Vui lòng chọn khối xét tuyển" }]}
        >
          <Select
            mode="tags"
            value={selectedValues}
            onChange={handleSelectChange}
            placeholder="Chọn giá trị"
            style={{ width: "100%" }}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="majorYear"
          label="Năm"
          rules={[{ required: true, message: "Vui lòng chọn năm" }]}
        >
          <Select placeholder="Chọn năm" showSearch filterOption={false}>
            {yearList.map((year, index) => (
              <Option key={index} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Điểm thi"
          name="score"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập điểm thi!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
          <Button htmlType="button" onClick={handleCancel}>
            Hủy bỏ
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormEditUniversityEntranceExamScore;
