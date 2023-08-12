import React, { useRef, useState } from "react";
import styled from "styled-components";
import ImagePicker from "../common/common components/ImagePicker";
import ModalLogo from "../common/common components/ModalLogo";
import Logo from "./../common/images/employee-modal-logo.png";

const Container = styled.div`
  width: 1220px;
  height: 860px;
  background: white;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
`;

const LeftSide = styled.div`
  flex: 33;
  background: #f4f8fb;
  border-radius: 12px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 89;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 71px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 676;
`;

const Footer = styled.div`
  flex: 114;
`;

const HeaderLabel = styled.p`
  margin-top: 40px;
  margin-bottom: 10px;
  margin-left: 37px;
  font-family: Roboto, sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0;
  text-align: left;
  color: ${(props) => props.theme.Header};
`;

const CloseButton = styled.button`
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

const Separator = styled.hr`
  border: 1px solid #dbd7d5;
  width: 95%;
  margin: 0;
`;

const InputsBlock = styled.div``;

const BlockHeader = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
`;

const AddNewVisitor = ({ onClose }) => {
  return (
    <Container>
      <LeftSide>
        <ImagePicker />
        <ModalLogo source={Logo} />
      </LeftSide>
      <RightSide>
        <Header>
          <HeaderLabel>Добавить нового посетителя</HeaderLabel>
          <CloseButton onClick={onClose} />
        </Header>
        <Separator />
        <Body>
          <InputsBlock style={{ flex: 222 }}>
            <BlockHeader>Данные посетителя</BlockHeader>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Транспортное средство</BlockHeader>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Место посещения</BlockHeader>
          </InputsBlock>
          <InputsBlock style={{ flex: 145 }}>
            <BlockHeader>Пропуск посетителя</BlockHeader>
          </InputsBlock>
        </Body>
        <Separator />
        <Footer></Footer>
      </RightSide>
    </Container>
  );
};

export default AddNewVisitor;
