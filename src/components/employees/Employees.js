import styled from "styled-components";
import SearchInput from "../header_menu/SearchInput";
import ButtonWithIcon from "../header_menu/ButtonWithIcon";
import FilterImg from "../../project_images/filter.png";
import AddImg from "./images/Add_ico.png";
import EmployeesTable from "./EmployeesTable";
import {
  Wrapper,
  HeaderMenuContainer,
  TableContainer,
  Elements,
  SearchAndFilters,
  Separator,
} from "../common/common components/screenComponents";

const EmployeesScreen = ({ showModal, closeModal }) => {
  const FilterFunction = () => {
    alert("filter");
  };

  //Здесь указывается, какое модальное окно будет показано. Список модалок в App.js
  const AddFunction = () => {
    showModal("newEmployee");
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
            label={"Добавить"}
            backColor={(props) => props.theme.LightBlue}
            textColor={(props) => props.theme.White}
            icon={AddImg}
            callback={AddFunction}
          />
        </Elements>
        <Separator />
      </HeaderMenuContainer>
      <TableContainer>
        <EmployeesTable />
      </TableContainer>
    </Wrapper>
  );
};

export default EmployeesScreen;
