import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import majorApi from "../api/majorApi";
function EditMajor({ major, item, handleUpdateMajor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (item) {
      setSelectedItem(item._id);
    }
  }, [item]);

  const handleEdit = async (values) => {
    try {
      setIsLoading(true);
      await majorApi.edit(selectedItem, values);
      handleUpdateMajor();
      message.success("Cập nhật chuyên ngành thành công");
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsOpen(false);
  };

  const showEditModal = () => {
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <EditOutlined
        style={{ fontSize: "18px", cursor: "pointer" }}
        onClick={showEditModal}
      />
      <Modal
        open={isOpen}
        title="Chỉnh sửa chuyên ngành"
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleEdit}
          initialValues={{ majorName: item.majorName }}
        >
          <Form.Item
            label="Tên chuyên ngành"
            name="majorName"
            rules={[
              { required: true, message: "Vui lòng nhập tên chuyên ngành" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default EditMajor;
