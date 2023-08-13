import styled from "styled-components";

export const Separator = styled.hr`
  border: 1px solid #dbd7d5;
  width: 95%;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 12px;
  height: 12px;
  margin-top: 28px;
  margin-right: 28px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    background-color: ${(props) => props.theme.LightGray};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const LeftSide = styled.div`
  flex: 33;
  background: #f4f8fb;
  border-radius: 12px;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 89;
  padding-left: 37px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 70;
`;

export const Footer = styled.div`
  flex: 114;
`;

export const HeaderLabel = styled.p`
  margin-top: 40px;
  margin-bottom: 10px;
  //margin-left: 37px;
  font-family: Roboto, sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0;
  text-align: left;
  color: ${(props) => props.theme.Header};
`;

export const InputsBlock = styled.div``;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonsContainer = styled.div`
  width: 242px;
  right: 43px;
  bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
`;

export const BlockHeader = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0;
  text-align: left;
`;

export default {
  Separator,
  CloseButton,
  LeftSide,
  RightSide,
  Header,
  Footer,
  HeaderLabel,
  InputsBlock,
  BlockHeader,
  InputsRow,
  ButtonsContainer,
};
