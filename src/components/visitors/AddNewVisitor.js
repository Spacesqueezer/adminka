import React, { useState } from "react";
import styled from "styled-components";
import ImagePicker from "../common/common components/ImagePicker";
import ModalLogo from "../common/common components/ModalLogo";
import Logo from "./../common/images/employee-modal-logo.png";
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
import TextInputWithLabel from "../common/common components/TextInputWithLabel";
import DateInputWithLabel from "../common/common components/DateInputWithLabel";
import CustomButton from "../common/common components/CustomButton";
import { createNewPerson, genUuid } from "../../API_functions";

const Container = styled.div`
  width: 1220px;
  height: 860px;
  background: white;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 676;
`;

const AddNewVisitor = ({ onClose }) => {
  // Стейт для хранения данных формы
  const [formData, setFormData] = useState({
    requestid: genUuid(),
    person_name: false,
    person_surname: false,
    person_patronymic: false,
    valid_from_date: false,
    valid_until_date: false,
    organization_id: false,
    transport_id: false,
    person_position: false,
    employee: false,
    person_birthdate: false,
    organization_floor: false,
    organization_office: false,
    transport: {
      mark: false,
      grz: false,
      organization_id: false,
      driver_name: false,
      driver_surname: false,
      driver_patronymic: false,
      valid_from_date: false,
      valid_until_date: false,
      base64_photo: false,
    },
  });

  //Функция отправки формы
  const submitFunction = () => {
    createNewPerson(formData);
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
        <CloseButton onClick={onClose} />
        <Header>
          <HeaderLabel>Добавить нового посетителя</HeaderLabel>
        </Header>
        <Separator />
        <Body>
          <InputsBlock style={{ flex: 222 }}>
            <BlockHeader>Данные посетителя</BlockHeader>
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
              <DateInputWithLabel
                label={"Дата рождения"}
                name={"person_birthdate"}
                onInput={handleInputChange}
              />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Транспортное средство</BlockHeader>
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}>
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
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Место посещения</BlockHeader>
            <InputsRow>
              <TextInputWithLabel
                label={"Организация"}
                name={"organization_id"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"Этаж"}
                name={"organization_floor"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"Офис"}
                name={"organization_office"}
                onInput={handleInputChange}
              />{" "}
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 145 }}>
            <BlockHeader>Пропуск посетителя</BlockHeader>
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}>
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
        </Body>
        <Separator />
        <Footer>
          {" "}
          <ButtonsContainer>
            <CustomButton type={"cancel"} label={"Отмена"} callback={onClose} />
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

export default AddNewVisitor;
