import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  UpSide,
  DownSide,
  ButtonsContainer,
  Header,
  HeaderLabel,
  Separator,
  InputsBlock,
  BlockHeader,
  InputsRow,
  CloseButton,
} from "../common/common components/modalWindowComponents";
import CustomButton from "../common/common components/CustomButton";
import TextInputWithLabel from "../common/common components/TextInputWithLabel";
import TabsSet from "../common/common components/TabsSet";
import EmployeesTab from "./EmployeesTab";
import TransportTab from "./TransportTab";
import getAmountOfEmployeesByOrgId from "../common/someFunctions";

const Container = styled.div`
  width: 1220px;
  height: 900px;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
`;

const EditOrganization = ({ onClose, orgData }) => {
  const [formData, setFormData] = useState({
    id: 0,
    organization_name: "",
    organization_address: "",
    organization_phone: "",
    organization_email: "",
    organization_floor: 0,
    office: 0,
  });
  const [employees, setEmployees] = useState();

  const tabs = {
    Сотрудники: <EmployeesTab org_id={orgData.id} />,
    Транспорт: <TransportTab />,
  };

  useEffect(() => {
    // Устанавливаем значения на данные организации
    setFormData({
      id: orgData.id,
      organization_name: orgData.name,
      organization_address: orgData.address,
      organization_phone: orgData.phone,
      organization_email: orgData.email,
      organization_floor: orgData.org_floor,
      office: orgData.office,
    });

    // загружаем сотрудников, которые работают в этой организации
    setEmployees(getAmountOfEmployeesByOrgId(orgData.id));

    // console.log(getAmountOfEmployeesByOrgId(orgData.id));
  }, [orgData]);

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

  const submitFunction = () => {
    console.log(formData);
  };

  return (
    <Container>
      <UpSide>
        <CloseButton onClick={onClose} />
        <Header style={{ display: "flex", flexDirection: "column" }}>
          <HeaderLabel>Редактировать организацию</HeaderLabel>
          <Separator />
          <InputsBlock style={{ flex: "1" }}>
            <BlockHeader>Данные организации</BlockHeader>
            <InputsRow style={{ gap: "45px" }}>
              <TextInputWithLabel
                label={"Название"}
                name={"organization_name"}
                onInput={handleInputChange}
                value={formData.organization_name}
              />
              <TextInputWithLabel
                style={{ width: "100%" }}
                label={"Юр. адрес"}
                name={"organization_address"}
                onInput={handleInputChange}
                value={formData.organization_address}
              />
            </InputsRow>
            <InputsRow style={{ gap: "45px" }}>
              <TextInputWithLabel
                label={"Телефон"}
                name={"organization_phone"}
                onInput={handleInputChange}
                value={formData.organization_phone}
              />
              <TextInputWithLabel
                label={"E-mail"}
                name={"organization_email"}
                onInput={handleInputChange}
                value={formData.organization_email}
              />
              <TextInputWithLabel
                label={"Этаж"}
                name={"organization_floor"}
                onInput={handleInputChange}
                value={formData.organization_floor}
              />
              <TextInputWithLabel
                label={"Офис"}
                name={"office"}
                onInput={handleInputChange}
                value={formData.office}
              />
            </InputsRow>
          </InputsBlock>
        </Header>
      </UpSide>
      <DownSide>
        <TabsSet tabs={tabs} />
        <ButtonsContainer style={{ bottom: "33px" }}>
          <CustomButton label={"Отмена"} type={"cancel"} callback={onClose} />
          <CustomButton
            label={"Отправить"}
            type={"confirm"}
            callback={submitFunction}
          />
        </ButtonsContainer>
      </DownSide>
    </Container>
  );
};

export default EditOrganization;
