import React, { useState } from "react";
import styled from "styled-components";
import SearchInput from "../header_menu/SearchInput";
import ButtonWithIcon from "../header_menu/ButtonWithIcon";
import FilterImg from "../../project_images/filter.png";
import AddImg from "./images/Add_ico.png";
import {
  Wrapper,
  HeaderMenuContainer,
  TableContainer,
  Elements,
  SearchAndFilters,
  Separator,
} from "../common/common components/screenComponents";
import OrganizationsTable from "./OrganizationsTable";

const OrganizationsScreen = ({ showModal, closeModal }) => {
  const [orgToRedact, setOrgToRedact] = useState(undefined); // хранит id организации, которую надо редактировать

  const FilterFunction = () => {
    alert("filter");
  };

  //Здесь указывается, какое модальное окно будет показано. Список модалок в App.js
  const AddFunction = () => {
    setOrgToRedact(undefined);
    showModal("newOrganization");
  };

  const showModalToRedact = (org_id) => {
    setOrgToRedact(org_id);
    showModal("newOrganization");
  };

  return (
    <Wrapper>
      <HeaderMenuContainer>
        <Elements>
          <SearchAndFilters>
            <SearchInput />
            <ButtonWithIcon
              label={"Разделы"}
              backColor={(props) => props.theme.White}
              textColor={(props) => props.theme.Black}
              icon={FilterImg}
              callback={FilterFunction}
            />
          </SearchAndFilters>
          <ButtonWithIcon
            label={"Добавить организацию"}
            backColor={(props) => props.theme.LightBlue}
            textColor={(props) => props.theme.White}
            icon={AddImg}
            callback={AddFunction}
          />
        </Elements>
        <Separator />
      </HeaderMenuContainer>
      <TableContainer>
        <OrganizationsTable showModal={showModal} />
      </TableContainer>
    </Wrapper>
  );
};

export default OrganizationsScreen;
