import styled from "styled-components";
import FilterImg from "./images/filter.png";

const Wrapper = styled.div`
  margin-left: 10px;
  height: 100%;
  width: 125px;
  border: 1px solid ${(props) => props.theme.InputBorder};
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Label = styled.p`
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.GrayText};
`;

const Image = styled.img`
  width: 17px;
  height: 17px;
`;

const FiltersButton = () => {
  return (
    <Wrapper>
      <Image src={FilterImg} />
      <Label>Разделы</Label>
    </Wrapper>
  );
};

export default FiltersButton;
