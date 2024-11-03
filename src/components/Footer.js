import styled from "styled-components";
import { useLocation } from "react-router-dom";

const TextFooter = styled.p`
  text-align: center;
  font-size: 14px;
`;

const FooterWrapper = styled.div`
  padding: 20px 0;
  margin-top: auto;
  display: ${(props) => (props.hideFooter ? "none" : "block")};
`;

function Footer() {
  const location = useLocation();
  const hideFooter = location.pathname === "/admin";
  return (
    <FooterWrapper hideFooter={hideFooter}>
      <TextFooter>@ Designed by Team TCT.</TextFooter>
    </FooterWrapper>
  );
}

export default Footer;
