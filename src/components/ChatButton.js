import { useState, useRef } from "react";
import { FloatButton, Modal } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import Chatbot from "../pages/Chatbot";

function ChatButton({ refs }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 50 }}
        icon={<CustomerServiceOutlined />}
        onClick={showModal}
        ref={refs.ref5}
      ></FloatButton>
      <Modal
        title="Chat với trợ lý"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Chatbot
          unreadMessages={unreadMessages}
          setUnreadMessages={setUnreadMessages}
        />
      </Modal>
    </>
  );
}

export default ChatButton;
