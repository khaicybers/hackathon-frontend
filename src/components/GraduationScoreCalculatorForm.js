import React, { useState, useEffect } from "react";
import { Form, Input, Radio, Result, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonComponents from "./ButtonComponents";
import useOpenAI from "../hooks/useOpenAI";
import styled from "styled-components";
import calculateScore from "./CalculateScore";

const StyledInput = styled(Input)`
  width: 100%;
  height: 40px;
  padding: 10px;
  transition: 0.2s linear;
  border: 2.5px solid black;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;

  :focus {
    outline: none;
    border: 0.5px solid black;
    box-shadow: -5px -5px 0px black;
  }
`;

function GraduationScoreCalculatorForm({ activeTab }) {
  const [score, setScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNaturalScience, setIsNaturalScience] = useState(
    activeTab === "naturalScience"
  );
  const { data, isLoading, handleRequest } = useOpenAI();

  useEffect(() => {
    if (data) {
      setIsModalVisible(true);
      setAdvice(data);
      setLoading(false);
    }
  }, [data]);

  const handleRadioChange = (e) => {
    setIsNaturalScience(e.target.value === "naturalScience");
  };
  const handleCalculateScore = (values) => {
    setLoading(true);
    const {
      biologyScore,
      chemistryScore,
      foreignLanguageScore,
      literatureScore,
      mathScore,
      physicsScore,
      geographyScore,
      historyScore,
      civicEducationScore,
    } = values;
    if (isNaturalScience) {
      handleFetch({
        biologyScore,
        chemistryScore,
        foreignLanguageScore,
        literatureScore,
        mathScore,
        physicsScore,
        isNaturalScience,
        score,
      });
    } else {
      handleFetch({
        mathScore,
        foreignLanguageScore,
        literatureScore,
        geographyScore,
        historyScore,
        civicEducationScore,
        isNaturalScience,
        score,
      });
    }
    let number = calculateScore(values, isNaturalScience);
    setScore(number);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const numericRules = (fieldName) => {
    return [
      {
        required: true,
        message: `Vui lòng nhập ${fieldName}`,
      },
      {
        pattern: /^\d*\.?\d+$/,
        message: "Vui lòng chỉ nhập số",
      },
    ];
  };

  const handleFetch = async (value) => {
    let content = "";
    if (value.isNaturalScience === true) {
      content = `Tôi có điểm toán là ${value.mathScore}, điểm văn là ${value.literatureScore}, điểm anh văn là ${value.foreignLanguageScore}, điểm lý là ${value.physicsScore}, điểm hóa là ${value.chemistryScore}, điểm sinh là ${value.biologyScore}. Điểm tốt nghiệp của tôi là ${value.score}. Cho tôi biết nên chọn khối thi nào (cụ thể ví dụ A01, A02, B01, B02), chọn ngành học đại học nào (cụ thể ví dụ như ngành tương ứng với khối thi), lưu ý trả lời ngắn gọn trong 20 từ`;
    } else {
      content = `Tôi có điểm toán là ${value.mathScore}, điểm văn là ${value.literatureScore}, điểm anh văn là ${value.foreignLanguageScore}, điểm giáo dục công dân là ${value.civicEducationScore}, điểm sử là ${value.historyScore}, điểm địa lí là ${value.geographyScore}. Điểm tốt nghiệp của tôi là ${value.score}. Cho tôi biết nên chọn khối thi nào (cụ thể ví dụ A01, A02, B01, B02), chọn ngành học đại học nào (cụ thể ví dụ như ngành tương ứng với khối thi), lưu ý trả lời ngắn gọn trong 20 từ`;
    }
    handleRequest(content);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        onFinish={handleCalculateScore}
        style={{ width: "570px" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Radio.Group
            defaultValue={activeTab}
            onChange={handleRadioChange}
            value={isNaturalScience ? "naturalScience" : "socialScience"}
          >
            <Radio.Button value="naturalScience">Khối tự nhiên</Radio.Button>
            <Radio.Button value="socialScience">Khối xã hội</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="mathScore"
          label="Điểm toán"
          hasFeedback
          rules={numericRules("điểm toán")}
        >
          <StyledInput />
        </Form.Item>
        <Form.Item
          name="literatureScore"
          label="Điểm ngữ văn"
          hasFeedback
          rules={numericRules("điểm ngữ văn")}
        >
          <StyledInput />
        </Form.Item>
        <Form.Item
          name="foreignLanguageScore"
          label="Điểm ngoại ngữ"
          hasFeedback
          rules={numericRules("điểm ngoại ngữ")}
        >
          <StyledInput />
        </Form.Item>
        {isNaturalScience && (
          <React.Fragment>
            <Form.Item
              name="physicsScore"
              label="Điểm vật lí"
              hasFeedback
              rules={numericRules("điểm vật lí")}
            >
              <StyledInput />
            </Form.Item>
            <Form.Item
              name="chemistryScore"
              label="Điểm hóa học"
              hasFeedback
              rules={numericRules("điểm hóa học")}
            >
              <StyledInput />
            </Form.Item>
            <Form.Item
              name="biologyScore"
              label="Điểm sinh học"
              hasFeedback
              rules={numericRules("điểm sinh học")}
            >
              <StyledInput />
            </Form.Item>
          </React.Fragment>
        )}
        {!isNaturalScience && (
          <React.Fragment>
            <Form.Item
              name="historyScore"
              label="Điểm lịch sử"
              hasFeedback
              rules={numericRules("điểm lịch sử")}
            >
              <StyledInput />
            </Form.Item>
            <Form.Item
              name="geographyScore"
              label="Điểm địa lí"
              hasFeedback
              rules={numericRules("điểm địa lí")}
            >
              <StyledInput />
            </Form.Item>
            <Form.Item
              name="civicEducationScore"
              label="Điểm GDCD"
              hasFeedback
              rules={numericRules("điểm GDCD")}
            >
              <StyledInput />
            </Form.Item>
          </React.Fragment>
        )}
        <Form.Item
          name="averageScore"
          label="Điểm trung bình năm 12"
          hasFeedback
          rules={numericRules("điểm trung bình năm 12")}
        >
          <StyledInput />
        </Form.Item>
        <Form.Item
          name="encouragementScore"
          label="Điểm khuyến khích (nếu có)"
          hasFeedback
          initialValue={0}
          rules={numericRules("điểm khuyến khích (nếu không có ghi 0)")}
        >
          <StyledInput />
        </Form.Item>
        <Form.Item
          name="additionalScore"
          label="Điểm ưu tiên (nếu có)"
          hasFeedback
          initialValue={0}
          rules={numericRules("điểm ưu tiên (nếu không có ghi 0)")}
        >
          <StyledInput />
        </Form.Item>
        <Form.Item
          labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          wrapperCol={{
            xs: { offset: 0, span: 24 },
            sm: { offset: 8, span: 16 },
          }}
        >
          <ButtonComponents
            content={
              loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ color: "black" }} />}
                />
              ) : (
                "Tính điểm"
              )
            }
            type="primary"
            htmlType="submit"
          />
        </Form.Item>
        <Modal
          title="Kết quả"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Result
            status="success"
            title={`Điểm tốt nghiệp của bạn là ${score}`}
            subTitle={advice}
          />
        </Modal>
      </Form>
    </div>
  );
}

export default GraduationScoreCalculatorForm;
