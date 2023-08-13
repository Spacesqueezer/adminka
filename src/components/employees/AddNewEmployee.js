import React, { useState } from "react";
import styled from "styled-components";
import TextInputWithLabel from "../common/common components/TextInputWithLabel";
import ImagePicker from "../common/common components/ImagePicker";
import ModalLogo from "../common/common components/ModalLogo";
import CustomButton from "../common/common components/CustomButton";
import Logo from "./../common/images/employee-modal-logo.png";
import DateInputWithLabel from "../common/common components/DateInputWithLabel";
import {
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
} from "../common/common components/modalWindowComponents";

const Container = styled.div`
  width: 1220px;
  height: 770px;
  background: white;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 535;
`;

//--------------------------------------------------------------------------------------------

const AddNewEmployee = ({ onClose }) => {
  // Стейт для хранения данных формы
  const [formData, setFormData] = useState({
    requestid: "",
    person_name: "",
    person_surname: "",
    person_patronymic: "",
    valid_from_date: "",
    valid_until_date: "",
    organization_id: 0,
    transport_id: 0,
    transport: {
      mark: "",
      grz: "",
      organization_id: 0,
      driver_name: "",
      driver_surname: "",
      driver_patronymic: "",
      valid_from_date: "",
      valid_until_date: "2023-08-02",
      base64_photo: "",
    },
  });

  // Функция отправки формы
  const submitFunction = () => {
    console.log(formData);
  };

  // Обработка ввода в инпут
  const handleInputChange = (name, value) => {
    let updatedFormData = { ...formData };

    if (name.startsWith("transport")) {
      const dotIndex = name.indexOf(".");
      if (dotIndex !== -1) {
        const transportKey = name.substring(dotIndex + 1);
        updatedFormData = {
          ...updatedFormData,
          transport: {
            ...updatedFormData.transport,
            [transportKey]: value,
          },
        };
      }
    } else {
      updatedFormData = {
        ...updatedFormData,
        [name]: value,
      };
    }

    setFormData(updatedFormData);
  };

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
              <TextInputWithLabel
                label={"Фамилия"}
                name={"person_surname"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"Имя"}
                name={"person_name"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"Отчество"}
                name={"person_patronymic"}
                onInput={handleInputChange}
              />
            </InputsRow>
            <InputsRow>
              <TextInputWithLabel label={"Наименование организации"} />
              <TextInputWithLabel label={"Должность"} />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Пропуск сотрудника</BlockHeader>
            <InputsRow>
              <DateInputWithLabel
                label={"Дата начала действия"}
                name={"valid_from_date"}
                onInput={handleInputChange}
              />
              <DateInputWithLabel
                label={"Окончание срока действия"}
                name={"valid_until_date"}
                onInput={handleInputChange}
              />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 145 }}>
            <BlockHeader>Транспортное средство</BlockHeader>
            <InputsRow>
              <TextInputWithLabel
                label={"Модель"}
                name={"transport.mark"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"Гос. номер"}
                name={"transport.grz"}
                onInput={handleInputChange}
              />
              <DateInputWithLabel label={"Пропуск"} />
            </InputsRow>
          </InputsBlock>
        </Body>
        <Separator />
        <Footer>
          <ButtonsContainer>
            <CustomButton
              type={"cancel"}
              label={"Отмена"}
              callback={onClose}
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
