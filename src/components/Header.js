import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { BubblyLink } from "react-bubbly-transitions";
import { Tour } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import NavMobile from "./NavMobile";
import { useState } from "react";

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 50px;
  position: fixed;
  background-color: #fff;
  z-index: 99;
  width: calc(100% - 100px);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  @media screen and (max-width: 576px) {
    padding: 20px 10px;
    width: calc(100% - 20px);
  }
`;
const HeaderLogo = styled(Link)`
  font-size: 20px;
  font-weight: 900;
  color: black;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;
const ListStyle = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
const LinkStyle = styled(BubblyLink)`
  text-decoration: none;
  color: #000;
`;
const MenuStyle = styled(MenuOutlined)`
  cursor: pointer;
  display: none;
  margin-left: auto;
  @media screen and (max-width: 1100px) {
    display: block;
  }
`;
function Header({ refs, open, setOpen }) {
  const [active, setActive] = useState(false);
  const steps = [
    {
      title: "Tính điểm",
      description:
        "Trang tính điểm trên trang web sử dụng AI để tính toán điểm số và đưa ra gợi ý về khối thi và ngành học phù hợp với điểm số của bạn, giúp bạn tìm hiểu và lựa chọn ngành học và khối thi phù hợp.",
      target: () => refs.ref1.current,
    },
    {
      title: "Tìm hiểu về ngành",
      description:
        "Trang tìm hiểu về khối thi và ngành học trên trang web cung cấp đầy đủ thông tin. Bạn có thể tìm kiếm thông tin bằng cách highlight text và bấm vào biểu tượng dấu hỏi để AI đưa ra kết quả trả lời.",
      target: () => refs.ref2.current,
    },
    {
      title: "Xem điểm chuẩn",
      description:
        "Trang xem điểm chuẩn cho phép bạn tìm kiếm trường đại học phù hợp với ngành và khu vực của mình. Bạn có thể xem thông tin cơ bản của trường và danh sách nhà trọ và quán ăn gần trường.",
      target: () => refs.ref3.current,
    },
    {
      title: "Thông tin tuyển sinh",
      description:
        "Trang web cung cấp thông tin tuyển sinh mới nhất của các trường đại học trên toàn quốc, giúp bạn nắm bắt thông tin về chỉ tiêu tuyển sinh, điểm chuẩn, hình thức và độ khó. Bạn có thể xem các bài đăng tuyển sinh để hiểu rõ hơn về yêu cầu và quy trình tuyển sinh của trường, hỗ trợ cho việc lựa chọn trường đại học phù hợp với nhu cầu và khả năng của bạn.",
      target: () => refs.ref4.current,
    },
    {
      title: "Trợ lí AI",
      description:
        "Trợ lí ảo AI có thể cung cấp tư vấn cho bạn về các câu hỏi liên quan đến lựa chọn ngành học, trường đại học phù hợp, và cung cấp thông tin liên quan đến các vấn đề khác mà bạn cần.",
      target: () => refs.ref5.current,
    },
  ];
  const location = useLocation();
  const hideHeader = location.pathname === "/admin";
  return (
    <HeaderStyle style={hideHeader ? { display: "none" } : { display: "flex" }}>
      <HeaderLogo to="/">La Bàn Hướng Nghiệp</HeaderLogo>
      <ListStyle>
        <LinkStyle
          colorStart="#3DD1E7"
          colorEnd="#fff"
          to="/"
          onClick={() => handleClick()}
        >
          <span>Trang chủ</span>
        </LinkStyle>
        <LinkStyle
          colorStart="#3DD1E7"
          colorEnd="#fff"
          to="/tinh-diem"
          onClick={() => handleClick()}
        >
          <span ref={refs.ref1}>Tính điểm</span>
        </LinkStyle>
        <LinkStyle colorStart="#3DD1E7" colorEnd="#fff" to="/tim-hieu-ve-nganh">
          <span ref={refs.ref2}>Tìm hiểu về ngành</span>
        </LinkStyle>
        <LinkStyle colorStart="#3DD1E7" colorEnd="#fff" to="/xem-diem-chuan">
          <span ref={refs.ref3}>Xem điểm chuẩn</span>
        </LinkStyle>
        <LinkStyle
          colorStart="#3DD1E7"
          colorEnd="#fff"
          to="/thong-tin-tuyen-sinh"
        >
          <span ref={refs.ref4}>Thông tin tuyển sinh</span>
        </LinkStyle>
      </ListStyle>
      <MenuStyle onClick={() => setActive(true)} />
      <NavMobile active={active} setActive={setActive} />
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </HeaderStyle>
  );
}

export default Header;
