import styled from "styled-components";

const StyleButton = styled.button`
  background-color: #3dd1e7;
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:after {
    content: "";
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }
  &:hover:after {
    bottom: 2px;
    left: 2px;
  }
  &:focus {
    outline: 0;
  }
`;

function ButtonComponents({ content, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return <StyleButton onClick={handleClick}>{content}</StyleButton>;
}

export default ButtonComponents;
