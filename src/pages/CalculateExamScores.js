import GraduationScoreCalculatorForm from "../components/GraduationScoreCalculatorForm";
import styled from "styled-components";
import { Row, Col } from "antd";
import CaculatorImage from "../assets/caculator.png";
import HelmetComponents from "../components/HelmetComponents";

const StyledCalculateExamScores = styled.div`
  padding: 120px 0 50px 0;
`;
const StyledWrapImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledImageCaculator = styled.img`
  width: 100%;
`;

function CalculateExamScores() {
  let title =
    "Tính điểm Tốt nghiệp - Xác định điểm trung bình và định hướng tương lai";
  let description =
    "Tìm kiếm ngành học phù hợp với sở thích và năng lực của bạn với La Bàn Hướng Nghiệp. Chúng tôi cung cấp thông tin về các ngành học và nghề nghiệp hấp dẫn, cùng những lời khuyên và hướng dẫn chi tiết.";
  return (
    <StyledCalculateExamScores>
      <HelmetComponents title={title} description={description} />
      <Row>
        <Col span={12} xs={24} lg={12}>
          <GraduationScoreCalculatorForm />
        </Col>
        <Col span={12} xs={24} lg={12}>
          <StyledWrapImage>
            <StyledImageCaculator src={CaculatorImage} />
          </StyledWrapImage>
        </Col>
      </Row>
    </StyledCalculateExamScores>
  );
}

export default CalculateExamScores;
