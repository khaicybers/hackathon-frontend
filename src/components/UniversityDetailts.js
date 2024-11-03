import { Modal, Descriptions } from "antd";
import React from "react";

function UniversityDetailts({
  isModalVisible,
  handleOk,
  handleCancel,
  selectedUniversity,
}) {
  return (
    <Modal
      title={selectedUniversity ? "Thông tin chi tiết" : ""}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}
    >
      {selectedUniversity && (
        <React.Fragment>
          <Descriptions bordered layout="horizontal" column={1}>
            <Descriptions.Item label="Mã trường">
              {selectedUniversity.universityCode}
            </Descriptions.Item>
            <Descriptions.Item label="Tên trường">
              {selectedUniversity.universityName}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {selectedUniversity.address}
            </Descriptions.Item>
            <Descriptions.Item label="Website">
              <a href={selectedUniversity.website} target="_blank">
                {selectedUniversity.website}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Logo">
              <img
                src={selectedUniversity.universityLogo}
                alt="University Logo"
                style={{
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <img
                src={selectedUniversity.image}
                alt="University Logo"
                style={{
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Thông tin tuyển sinh">
              <a href={selectedUniversity.admissionInformation} target="_blank">
                {selectedUniversity.admissionInformation}
              </a>
            </Descriptions.Item>
          </Descriptions>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default UniversityDetailts;
