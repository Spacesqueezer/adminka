import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
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
