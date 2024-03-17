import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  border-radius: 16px;
  flex-direction: column;
  background: ${(props) => props.theme.White};
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.05);
  padding: 30px 40px 30px 40px;
`;

export const HeaderMenuContainer = styled.div`
  flex: 95;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TableContainer = styled.div`
  position: relative;
  flex: 797;
  overflow: hidden;
`;

export const Elements = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SearchAndFilters = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Separator = styled.hr`
  border: 1px solid #a3a9c8;
  width: 100%;
  margin: 0;
`;

export default {
  Wrapper,
  HeaderMenuContainer,
  TableContainer,
  Elements,
  SearchAndFilters,
  Separator,
};
