import HighlightMenu from "react-highlight-menu";
import React, { useState, useEffect } from "react";
import { Button, Space, notification, message } from "antd";
import { QuestionCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import useOpenAI from "../hooks/useOpenAI";

function Highlight() {
  const [loading, setLoading] = useState(false);
  const { data, isLoading, handleRequest } = useOpenAI();
  const handleClick = (selectedText) => {
    const keyword = "Khối";
    let content = "";
    if (selectedText.startsWith(keyword)) {
      content = `Tìm hiểu về khối thi ${selectedText}, trả lời dưới 20 từ`;
    } else {
      content = `Tìm hiểu về ${selectedText}, trả lời dưới 20 từ`;
    }
    setLoading(true);
    handleRequest(content);
  };
  useEffect(() => {
    if (data) {
      setLoading(false);
      notification.open({
        message: <h3>Tra cứu thông tin</h3>,
        description: data,
        duration: null,
        className: "smart-lookup",
      });
    }
  }, [data]);

  return (
    <>
      <HighlightMenu
        target=".list"
        menu={({ selectedText, setMenuOpen }) => (
          <Space wrap>
            <Button
              style={{ backgroundColor: "#E2E8F0", color: "black" }}
              type="primary"
              icon={<QuestionCircleOutlined />}
              size={"large"}
              onClick={() => handleClick(selectedText)}
              loading={loading}
            />
            <Button
              style={{ backgroundColor: "#E2E8F0", color: "black" }}
              type="primary"
              icon={<CloseCircleOutlined />}
              size={"large"}
              onClick={() => setMenuOpen(false)}
            />
          </Space>
        )}
        styles={{
          borderColor: "white",
          background: "white",
          boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
          zIndex: 10,
          borderRadius: "5px",
          padding: "3px",
        }}
      />
    </>
  );
}

export default Highlight;
