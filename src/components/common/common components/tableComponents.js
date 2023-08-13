import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead``;

export const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  overflow: hidden;
`;

export const TableHeaderLabel = styled.th`
  padding: 8px;
  background: ${(props) => props.theme.TableHeaderBackground};
  color: ${(props) => props.theme.TableHeaderColor};
  cursor: pointer;
  user-select: none;
  position: sticky;
  top: 0;
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.TableHeaderFont};
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0;
  text-align: left;
`;

export const TableRow = styled.tr`
  align-items: center;
  td {
    height: 52px;
    vertical-align: middle;
  }
`;

export const TableData = styled.td`
  padding: 8px;
  text-overflow: ellipsis;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 12px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 1;
`;

export const PaginationButton = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  background: ${(props) =>
    props.active
      ? props.theme.PaginationButtonActiveBackground
      : props.theme.PaginationButtonBackground};
  color: ${(props) =>
    props.active
      ? props.theme.PaginationButtonActiveColor
      : props.theme.PaginationButtonColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ExpirationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ExpirationDate = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ExpirationArrow = styled.img`
  width: 15px;
  height: 10px;
`;

export const ExpirationDeltaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 20px;
  border-radius: 6px;
  margin-left: 7px;
`;

export const ExpirationDeltaText = styled.p`
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
`;

export const EditDeleteButtons = styled.img``;

export const EditDeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 18px;
  width: 62px;
  justify-content: space-between;
`;

export default {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHeaderLabel,
  TableRow,
  TableData,
  Image,
  Pagination,
  PaginationButton,
  ExpirationContainer,
  ExpirationDate,
  ExpirationArrow,
  ExpirationDeltaContainer,
  ExpirationDeltaText,
  EditDeleteContainer,
  EditDeleteButtons,
};
