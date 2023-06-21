import styled from "styled-components";
import HeaderMenu from "../header_menu/HeaderMenu";

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
`;

const EmployeesScreen = () => {
  return (
    <Wrapper>
      <HeaderMenuContainer>
        <HeaderMenu />
      </HeaderMenuContainer>
      <TableContainer />
    </Wrapper>
  );
};

export default EmployeesScreen;
