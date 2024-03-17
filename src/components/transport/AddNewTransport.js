import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInputWithLabel from "../common/common components/TextInputWithLabel";
import ImagePicker from "../common/common components/ImagePicker";
import ModalLogo from "../common/common components/ModalLogo";
import CustomButton from "../common/common components/CustomButton";
import Logo from "./../common/images/transport-modal-logo.png";
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
import DropListWithLabel from "../common/common components/DropListWithLabel";
import { getListOfOrganizations } from "../../API_functions";

const Container = styled.div`
  width: 1220px;
  height: 892px;
  background: ${(props) => props.theme.White};
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

const DriverHeader = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;

const AddNewTransport = ({ onClose }) => {
  // Стейт для хранения данных формы
  const [formData, setFormData] = useState({
    mark: "",
    grz: "",
    organization_id: 0,
    driver_name: "",
    driver_surname: "",
    driver_patronymic: "",
    valid_from_date: "",
    valid_until_date: "",
    base64_photo: "",
  });
  const [organizations, setOrganizations] = useState({});

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

  useEffect(() => {
    const organizations = getListOfOrganizations();
    const organizationsList = organizations.map((item) => ({
      id: item.id,
      name: item.organization_name,
    }));
    setOrganizations(organizationsList);
  }, []);

  return (
    <Container>
      <LeftSide>
        {" "}
        <ImagePicker />
        <ModalLogo source={Logo} />
      </LeftSide>
      <RightSide>
        <Header>
          <HeaderLabel>Добавить транспортное средство</HeaderLabel>
          <CloseButton onClick={onClose} />
        </Header>
        <Separator />
        <Body>
          <InputsBlock style={{ flex: 175 }}>
            <BlockHeader>Данные автомобиля</BlockHeader>
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}>
              <TextInputWithLabel
                label={"Марка"}
                name={"mark"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"ГРЗ"}
                name={"grz"}
                onInput={handleInputChange}
              />
            </InputsRow>
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}></InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 321 }}>
            <BlockHeader>На ком зарегистрировано</BlockHeader>
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}>
              <DropListWithLabel label={"Организация"} data={organizations} />
            </InputsRow>
            <DriverHeader>Водитель</DriverHeader>
            <InputsRow>
              <TextInputWithLabel
                label={"Фамилия"}
                name={"driver_surname"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"Имя"}
                name={"driver_name"}
                onInput={handleInputChange}
              />
              <TextInputWithLabel
                label={"Отчество"}
                name={"driver_patronymic"}
                onInput={handleInputChange}
              />
            </InputsRow>
            {/*TODO сделать выбор сотрудник или гость*/}
          </InputsBlock>
          <InputsBlock style={{ flex: 144 }}>
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

export default AddNewTransport;
