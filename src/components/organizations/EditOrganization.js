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

const Container = styled.div`
  width: 1220px;
  height: 900px;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
`;

const tabs = {
  Сотрудники: <EmployeesTab />,
  Транспорт: <TransportTab />,
};

const EditOrganization = ({ onClose, orgdata }) => {
  const [formData, setFormData] = useState({
    id: 0,
    organization_name: "",
    organization_address: "",
    organization_phone: "",
    organization_email: "",
    organization_floor: 0,
    office: 0,
  });

  useEffect(() => {
    setFormData({
      id: orgdata.id,
      organization_name: orgdata.name,
      organization_address: orgdata.address,
      organization_phone: orgdata.phone,
      organization_email: orgdata.email,
      organization_floor: orgdata.org_floor,
      office: orgdata.office,
    });
    console.log(formData);
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
