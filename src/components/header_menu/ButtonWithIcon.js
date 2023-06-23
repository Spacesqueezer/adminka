import styled from "styled-components";

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
  background: ${(props) => props.backColor};
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

const ButtonWithIcon = ({ backColor, icon, label, callback }) => (
  <Wrapper backColor={backColor} onClick={callback}>
    <Image src={icon} />
    <Label>{label}</Label>
  </Wrapper>
);

export default ButtonWithIcon;
