import React, { useState } from "react";
import { message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import majorApi from "../api/majorApi";
function DeleteMajor({ item, handleUpdateMajor }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleDelete = async (item) => {
    setSelectedMajor(item);
    setIsOpen(true);
  };

  const handleOk = async () => {
    try {
      setIsLoading(true);
      await majorApi.deleteById(selectedMajor._id);
      message.success("Xóa chuyên ngành thành công");
      handleUpdateMajor();
    } catch (error) {
      message.error("Xóa chuyên ngành thất bại");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <React.Fragment>
      <DeleteOutlined
        style={{ marginRight: 10, fontSize: "18px", cursor: "pointer" }}
        onClick={() => handleDelete(item)}
      />
      <Modal
        title="Xác nhận xóa"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <p>Bạn có chắc chắn muốn xóa chuyên ngành này?</p>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteMajor;
