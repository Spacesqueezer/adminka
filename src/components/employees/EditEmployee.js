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
  getListOfOrganizations,
  updatePersonInformation,
  genUuid,
} from "../../API_functions";

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

const EditEmployee = ({ onClose, editData }) => {
  // Стейт для хранения данных формы
  const [formData, setFormData] = useState({
    requestid: genUuid(),
    person_name: editData.person_name,
    person_surname: editData.person_surname,
    person_patronymic: editData.person_patronymic,
    valid_from_date: editData.valid_from_date,
    valid_until_date: editData.valid_until_date,
    organization_id: editData.organization_id,
    transport_id: editData.transport_id,
    transport: {
      mark: editData.transport.mark,
      grz: editData.transport.grz,
      organization_id: editData.transport.organization_id,
      driver_name: editData.transport.driver_name,
      driver_surname: editData.transport.driver_surname,
      driver_patronymic: editData.transport.driver_patronymic,
      valid_from_date: editData.transport.valid_from_date,
      valid_until_date: editData.transport.valid_until_date,
      base64_photo: editData.transport.base64_photo,
    },
    vectors: [
      {
        photo: editData.vectors[0].photo,
      },
    ],
  });
  const [organizations, setOrganizations] = useState({});

  // Функция отправки формы
  const submitFunction = () => {
    updatePersonInformation(formData);
  };

  useEffect(() => {
    // устанавливаем данные формы
    // setFormData();

    // устанавливаем список организаций
    const organizations = getListOfOrganizations();
    const organizationsList = organizations.map((item) => ({
      id: item.id,
      name: item.organization_name,
    }));
    setOrganizations(organizationsList);
  }, []);

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

  const changeOrganizationInfo = (data) => {
    // console.log(JSON.stringify(data, null, 2));
    setFormData({
      ...formData,
      organization_id: data,
      transport: { ...formData.transport, organization_id: data },
    });
  };

  const setNewPhoto = (photo) => {
    setFormData({
      ...formData,
      vectors: [
        {
          ...formData.vectors[0],
          photo: photo,
        },
      ],
    });
  }

  return (
    <Container>
      <LeftSide>
        <ImagePicker selectedPhoto={formData.vectors[0].photo} onImageSelect={setNewPhoto} />
        <ModalLogo source={Logo} />
      </LeftSide>
      <RightSide>
        <Header>
          <HeaderLabel>Редактировать сотрудника</HeaderLabel>
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
                value={formData.person_surname}
              />
              <TextInputWithLabel
                label={"Имя"}
                name={"person_name"}
                onInput={handleInputChange}
                value={formData.person_name}
              />
              <TextInputWithLabel
                label={"Отчество"}
                name={"person_patronymic"}
                onInput={handleInputChange}
                value={formData.person_patronymic}
              />
            </InputsRow>
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}>
              <DropListWithLabel
                label={"Наименование организации"}
                data={organizations}
                selected={formData.organization_id}
                onSelect={changeOrganizationInfo}
              />

              {/*Временно убрано*/}
              {/*<TextInputWithLabel label={"Должность"} />*/}
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Пропуск сотрудника</BlockHeader>
            <InputsRow style={{ maxWidth: "530px", gap: "40px" }}>
              <DateInputWithLabel
                label={"Дата начала действия"}
                name={"valid_from_date"}
                onInput={handleInputChange}
                value={formData.valid_from_date}
              />
              <DateInputWithLabel
                label={"Окончание срока действия"}
                name={"valid_until_date"}
                onInput={handleInputChange}
                value={formData.valid_until_date}
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
                value={formData.transport.mark}
              />
              <TextInputWithLabel
                label={"Гос. номер"}
                name={"transport.grz"}
                onInput={handleInputChange}
                value={formData.transport.grz}
              />
              <DateInputWithLabel label={"Пропуск"} />
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

export default EditEmployee;
