import styled from "styled-components";
const StyledH2 = styled.h2`
  text-align: center;
  padding: 20px 0;
  color: #373b44;
  background: conic-gradient(from 90deg at 3px 3px, #0000 90deg, #373b44 0)
    0.45em 0.45em / calc(100% - 0.45em - 2 * 0.45em)
    calc(100% - 0.45em - 2 * 0.45em);
  outline: 3px solid #0000;
  outline-offset: 0.6em;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 20px;
  user-select: none;
`;
function Title({ content }) {
  return <StyledH2>{content}</StyledH2>;
}

export default Title;
