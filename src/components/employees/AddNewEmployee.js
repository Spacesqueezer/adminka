import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../common/common components/TextInput";
import ImagePicker from "../common/common components/ImagePicker";
import ModalLogo from "../common/common components/ModalLogo";
import CustomButton from "../common/common components/CustomButton";
import Logo from "./../common/images/employee-modal-logo.png";
import DateInput from "../common/common components/DateInput";

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
  display: flex;
  flex-direction: column;
  padding-left: 36px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 71;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 535;
`;

const Footer = styled.div`
  flex: 114;
`;

const Separator = styled.hr`
  border: 1px solid #dbd7d5;
  width: 95%;
  margin: 0;
`;

const HeaderLabel = styled.p`
  margin-top: 40px;
  margin-bottom: 10px;
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

const InputsBlock = styled.div``;

const BlockHeader = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
`;

const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonsContainer = styled.div`
  width: 242px;
  right: 43px;
  bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
`;

//--------------------------------------------------------------------------------------------

const AddNewEmployee = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
  });

  const submitFunction = () => {};

  return (
    <Container>
      <LeftSide>
        <ImagePicker />
        <ModalLogo source={Logo} />
      </LeftSide>
      <RightSide>
        <Header>
          <HeaderLabel>Добавить нового сотрудника</HeaderLabel>
          <CloseButton onClick={onClose} />
        </Header>
        <Separator />
        <Body>
          <InputsBlock style={{ flex: 222 }}>
            <BlockHeader>Данные сотрудника</BlockHeader>
            <InputsRow>
              <TextInput label={"Имя"} />
              <TextInput label={"Фамилия"} />
              <TextInput label={"Отчество"} />
            </InputsRow>
            <InputsRow>
              <TextInput label={"Наименование организации"} />
              <TextInput label={"Должность"} />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Пропуск сотрудника</BlockHeader>
            <InputsRow>
              <DateInput label={"Дата начала действия"} />
              <DateInput label={"Окончание срока действия"} />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 145 }}>
            <BlockHeader>Транспортное средство</BlockHeader>
            <InputsRow>
              <TextInput label={"Модель"} />
              <TextInput label={"Гос. номер"} />
              <TextInput label={"Пропуск"} />
            </InputsRow>
          </InputsBlock>
        </Body>
        <Separator />
        <Footer>
          <ButtonsContainer>
            <CustomButton
              type={"cancel"}
              label={"Отмена"}
              callback={submitFunction}
            />
            <CustomButton
              type={"confirm"}
              label={"Добавить"}
              callback={submitFunction}
            />
          </ButtonsContainer>
        </Footer>
      </RightSide>
    </Container>
  );
};

export default AddNewEmployee;
