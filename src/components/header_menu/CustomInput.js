import styled from "styled-components";
import SearchImg from "./images/Search.png";

const Wrapper = styled.div``;
const Input = styled.input`
  height: 100%;
  width: 300px;
  padding: 0 0 0 40px;
  border: 1px solid ${(props) => props.theme.InputBorder};
  border-radius: 6px;
  background-image: url(${SearchImg});
  background-position: 10px center;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  box-sizing: border-box;
`;

const CustomInput = () => {
  return (
    <Wrapper>
      <Input placeholder={"Поиск"} />
    </Wrapper>
  );
};

export default CustomInput;
