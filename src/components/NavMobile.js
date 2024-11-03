import styled from "styled-components";
import { BubblyLink } from "react-bubbly-transitions";
import React from "react";

const StyledLink = styled(BubblyLink)`
  text-decoration: none;
  color: #000;
`;

const StyledNavMobile = styled.div`
  transition: all 0.25s ease-in-out;
  height: 100vh;
  position: absolute;
  top: 0;
  transform: ${({ active }) =>
    active ? "translateX(0%)" : "translateX(100%)"};
  right: 0;
  background: #fff;
  padding: 10px;
  width: 75%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 99;
`;

const StyledOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 21;
  transform: ${({ active }) =>
    active ? "translateX(0%)" : "translateX(100%)"};
`;

const StyledLi = styled.li`
  padding: 15px 10px;
`;
function NavMobile({ active, setActive }) {
  return (
    <React.Fragment>
      <StyledNavMobile active={active}>
        <ul>
          <StyledLi onClick={() => setActive(false)}>
            <StyledLink colorStart="#3DD1E7" colorEnd="#fff" to="/">
              Trang chủ
            </StyledLink>
          </StyledLi>
          <StyledLi onClick={() => setActive(false)}>
            <StyledLink colorStart="#3DD1E7" colorEnd="#fff" to="/tinh-diem">
              Tính điểm
            </StyledLink>
          </StyledLi>
          <StyledLi onClick={() => setActive(false)}>
            <StyledLink
              colorStart="#3DD1E7"
              colorEnd="#fff"
              to="/tim-hieu-ve-nganh"
            >
              Tìm hiểu về ngành
            </StyledLink>
          </StyledLi>
          <StyledLi onClick={() => setActive(false)}>
            <StyledLink
              colorStart="#3DD1E7"
              colorEnd="#fff"
              to="/thong-tin-tuyen-sinh"
            >
              Thông tin tuyển sinh
            </StyledLink>
          </StyledLi>
          <StyledLi onClick={() => setActive(false)}>
            <StyledLink
              colorStart="#3DD1E7"
              colorEnd="#fff"
              to="/xem-diem-chuan"
            >
              Xem điểm chuẩn
            </StyledLink>
          </StyledLi>
        </ul>
      </StyledNavMobile>
      <StyledOverlay onClick={() => setActive(false)} active={active} />
    </React.Fragment>
  );
}

export default NavMobile;
