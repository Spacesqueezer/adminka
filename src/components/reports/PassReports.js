import React, { useState } from "react";
import {
  Elements,
  HeaderMenuContainer,
  SearchAndFilters,
  Separator,
  TableContainer,
  Wrapper,
} from "../common/common components/screenComponents";
import SearchInput from "../header_menu/SearchInput";
import ButtonWithIcon from "../header_menu/ButtonWithIcon";
import FilterImg from "../../project_images/filter.png";
import SettingsIco from "../common/images/Filter_ico.png";
import WrenchIco from "../common/images/wrench_ico.png";
import AddImg from "../employees/images/Add_ico.png";
import PassReportsTable from "./PassReportsTable";

const PassReports = () => {
  const [searchBy, setSearchBy] = useState("");
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderMenuContainer>
        <Elements>
          <SearchAndFilters>
            <SearchInput onTextChange={(data) => setSearchBy(data)} />
            <ButtonWithIcon
              label={"Разделы"}
              backColor={(props) => props.theme.White}
              textColor={(props) => props.theme.Black}
              icon={FilterImg}
              // callback={FilterFunction}
            />
            <ButtonWithIcon
              label={"Фильтр"}
              backColor={(props) => props.theme.White}
              textColor={(props) => props.theme.Black}
              icon={SettingsIco}
              // callback={AddFunction}
            />
            <ButtonWithIcon
              label={"Конструктор"}
              backColor={(props) => props.theme.White}
              textColor={(props) => props.theme.Black}
              icon={WrenchIco}
              // callback={AddFunction}
            />
          </SearchAndFilters>
        </Elements>
        <Separator />
      </HeaderMenuContainer>
      <TableContainer>
        <PassReportsTable searchBy={searchBy} />
      </TableContainer>
    </div>
  );
};

export default PassReports;
