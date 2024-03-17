import React, { useEffect, useState } from "react";
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
import DropListWithLabel from "../common/common components/DropListWithLabel";
import {
  createNewPerson,
  genUuid,
  getListOfOrganizations,
} from "../../API_functions";
import transport from "../transport/Transport";
import DateRangePicker from "../common/common components/DateRangePicker";

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

const AddNewEmployee = ({ onClose }) => {
  // Стейт для хранения данных формы
  const [formData, setFormData] = useState({
    requestid: 0 /*genUuid()*/,
    person_name: "",
    person_surname: "",
    person_patronymic: "",
    valid_from_date: "",
    valid_until_date: "",
    organization_id: 0,
    transport_id: 0,
    person_position: "",
    employee: true,
    person_birthdate: "",
    organization_floor: "",
    organization_office: "",
    transport: {
      mark: false,
      grz: false,
      organization_id: 0,
      driver_name: "",
      driver_surname: "",
      driver_patronymic: "",
      valid_from_date: "",
      valid_until_date: "",
      base64_photo: "",
    },
  });
  const [photo, setPhoto] = useState(null);
  const [organizations, setOrganizations] = useState({});

  // Функция отправки формы
  const submitFunction = () => {
    let dataToSend = formData;
    if (dataToSend.transport.mark && dataToSend.transport.grz) {
      dataToSend = {
        ...dataToSend,
        transport: {
          ...dataToSend.transport,
          driver_name: dataToSend.person_name,
          driver_surname: dataToSend.person_surname,
          driver_patronymic: dataToSend.person_patronymic,
        },
      };
    }
    createNewPerson(dataToSend, photo);
  };

  const changeOrganizationInfo = (data) => {
    setFormData({
      ...formData,
      organization_id: data,
      transport_id: genUuid(),
      transport: { ...formData.transport, organization_id: data },
    });
  };

  const setUserPhoto = (photo) => {
    setPhoto(photo);
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

  const onSelectRange = (range) => {
    setFormData({
      ...formData,
      transport: {
        ...formData.transport,
        valid_from_date: range.fromDate,
        valid_until_date: range.untilDate,
      },
    });
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
        <ImagePicker selectedPhoto={photo} onImageSelect={setUserPhoto} />
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
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}>
              <DropListWithLabel
                label={"Наименование организации"}
                data={organizations}
                onSelect={changeOrganizationInfo}
              />
              <TextInputWithLabel
                label={"Должность"}
                name={"person_position"}
                onInput={handleInputChange}
              />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Пропуск сотрудника</BlockHeader>
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
              <DateRangePicker
                label={"Пропуск"}
                onSelectRange={onSelectRange}
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

export default AddNewEmployee;
