import BannerImage from "../assets/banner.png";
import ServiceImage from "../assets/download (1) (1).png";
import { Row, Col, Modal } from "antd";
import styled from "styled-components";
import ButtonComponents from "../components/ButtonComponents";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const StyledBanner = styled.div`
  padding: 100px 0;
`;
const StyledBannerDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
`;
const StyledSpan = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;
const StyledH1 = styled.h1`
  font-size: 35px;
  font-weight: 900;
  line-height: 1.5;
  margin-bottom: 20px;
  max-width: 70%;
  color: #001529;
  @media screen and (max-width: 576px) {
    max-width: 100%;
  }
`;
const StyledFeature = styled.div`
  padding: 50px 0 100px 0;
`;
const StyledFeatureDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-left: 100px;
  @media screen and (max-width: 576px) {
    padding-left: 50px;
  }
`;
const StyledLi = styled.li`
  color: #4f4f4f;
  padding-left: 30px;
  margin-top: 24px;
  position: relative;
  font-size: 16px;
  line-height: 20px;
  list-style: decimal !important;
  &::before {
    content: "";
    display: block;
    height: 42px;
    width: 42px;
    border-radius: 50%;
    border: 2px solid #ddd;
    position: absolute;
    top: -12px;
    left: -35px;
  }
  &:nth-child(odd)::before {
    border-color: #0bad02;
  }
  &:nth-child(even)::before {
    border-color: #2378d5;
  }
`;
const StyledStrong = styled.strong`
  font-weight: 700;
  font-size: 16px;
`;

function HomePage({ open, setOpen }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (window.innerWidth <= 1100) {
      navigate("/tinh-diem");
    } else {
      setOpen(true);
    }
  };
  return (
    <div>
      <StyledBanner>
        <Row>
          <Col span={12} xs={24} lg={12}>
            <StyledBannerDesc>
              <StyledH1>
                CÙNG NHAU KHÁM PHÁ NGÀNH HỌC PHÙ HỢP VỚI BẢN THÂN ?
              </StyledH1>
              <StyledSpan>Ở đây gợi ý ngay cho bạn</StyledSpan>
              <ButtonComponents
                content={"Tìm hiểu ngay"}
                onClick={handleClick}
              />
            </StyledBannerDesc>
          </Col>
          <Col xs={24} lg={12}>
            <StyledImage src={BannerImage} />
          </Col>
        </Row>
      </StyledBanner>
      <StyledFeature>
        <Row>
          <Col xs={24} lg={12}>
            <StyledImage src={ServiceImage} />
          </Col>
          <Col span={12} xs={24} lg={12}>
            <StyledFeatureDesc>
              <Title content={"Cùng Nhau Tìm Hiểu"} />
              <ol class="alternating-colors">
                <StyledLi>
                  <StyledStrong>Trường học của bạn</StyledStrong>
                  <p>Nơi học tập và phát triển kỹ năng.</p>
                </StyledLi>
                <StyledLi>
                  <StyledStrong>Nơi ở hợp lí</StyledStrong>
                  <p>Nơi an toàn, tiện nghi và thoải mái để sinh sống.</p>
                </StyledLi>
                <StyledLi>
                  <StyledStrong>Quán ăn ngon lành</StyledStrong>
                  <p>Nơi thưởng thức những món ăn ngon và lành mạnh.</p>
                </StyledLi>
                <StyledLi>
                  <StyledStrong>Trợ lí AI tư vấn mọi thứ</StyledStrong>
                  <p>
                    Trợ lí thông minh giúp bạn tìm kiếm thông tin và giải đáp
                    thắc mắc.
                  </p>
                </StyledLi>
              </ol>
            </StyledFeatureDesc>
          </Col>
        </Row>
      </StyledFeature>
    </div>
  );
}

export default HomePage;
