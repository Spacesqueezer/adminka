import React, { useRef, useState } from "react";
import styled from "styled-components";


const Container = styled.div`
  width: 1220px;
  height: 770px;
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
  flex: 89;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 71px;
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





const AddNewVisitor = ({ onClose }) => {
  return (
    <Container>
      <LeftSide>
      </LeftSide>
      <RightSide>
        <Header>
          <HeaderLabel>Добавить нового посетителя</HeaderLabel>
          <CloseButton onClick={onClose} />
        </Header>
      </RightSide>
    </Container>
  );
};

export default AddNewVisitor;
