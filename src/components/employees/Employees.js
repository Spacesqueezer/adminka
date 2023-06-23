import styled from "styled-components";
import SearchInput from "../header_menu/SearchInput";
import ButtonWithIcon from "../header_menu/ButtonWithIcon";
import FilterImg from "../../project_images/filter.png";
import AddImg from "./images/Add_ico.png";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const TableContainer = styled.div`
  flex: 84;
`;

const HeaderMenuContainer = styled.div`
  flex: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Elements = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchAndFilters = styled.div`
  display: flex;
  flex-direction: row;
`;

const Separator = styled.hr`
  border: 1px solid #a3a9c8;
  width: 100%;
  margin: 0;
`;

const FilterFunction = () => {
  alert("filter");
};

const AddFunction = () => {
  alert("Add");
};

const EmployeesScreen = () => {
  return (
    <Wrapper>
      <HeaderMenuContainer>
        <Elements>
          <SearchAndFilters>
            <SearchInput />
            <ButtonWithIcon
              label={"Разделы"}
              backColor={(props) => props.theme.WhiteBackground}
              icon={FilterImg}
              callback={FilterFunction}
            />
          </SearchAndFilters>
          <ButtonWithIcon
            label={"Добавить"}
            backColor={(props) => props.theme.BlueBackground}
            icon={AddImg}
            callback={AddFunction}
          />
        </Elements>
        <Separator />
      </HeaderMenuContainer>
      <TableContainer />
    </Wrapper>
  );
};

export default EmployeesScreen;
