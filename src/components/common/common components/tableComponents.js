import styled, { useTheme } from "styled-components";
import React, { useEffect, useState } from "react";
import RedArrow from "../../employees/images/red_arrow.png";
import GreenArrow from "../../employees/images/green_arrow.png";
import SortArrow from "../../employees/images/Sort_Arrow.png";

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

export const EditDeleteButtons = styled.img`
  cursor: pointer;
`;

export const EditDeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 18px;
  width: 62px;
  justify-content: space-between;
`;

export const Expiration = ({ from, until, delta }) => {
  const theme = useTheme();
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    delta < 0 ? setIsExpired(true) : setIsExpired(false);
  }, [delta]);
  return (
    <ExpirationContainer>
      <ExpirationDate>{from}</ExpirationDate>
      <ExpirationArrow src={isExpired ? RedArrow : GreenArrow} />
      <ExpirationDate
        style={{
          color: isExpired ? theme.ExpirationDateRed : "black",
        }}
      >
        {until}
      </ExpirationDate>
      <ExpirationDeltaContainer
        style={{
          background: isExpired
            ? theme.ExpirationDateRed
            : theme.ExpirationDateGreen,
        }}
      >
        <ExpirationDeltaText>{Math.abs(delta)}</ExpirationDeltaText>
      </ExpirationDeltaContainer>
    </ExpirationContainer>
  );
};

export const ColumnHeader = ({
  title,
  sortOrder,
  sortBy: sortByOrder,
  sortFunc,
}) => {
  const isAscending = sortOrder === "asc";
  const rotateDegree = isAscending ? 0 : 180;

  return (
    <TableHeaderLabel onClick={() => sortFunc(sortByOrder)}>
      {title}{" "}
      <img
        src={SortArrow}
        style={{ transform: `rotate(${rotateDegree}deg)` }}
        alt={title}
      />
    </TableHeaderLabel>
  );
};

const StatusContainer = styled.div`
  width: 110px;
  height: 25px;
  display: flex; /* Включаем flexbox */
  flex-direction: column; /* Устанавливаем направление столбца для вертикального выравнивания */
  justify-content: center; /* Выравниваем по центру по вертикали */
  align-items: center; /* Выравниваем по центру по горизонтали */
  padding: 7px 10px 7px 10px;
  border-radius: 8px;
  background-color: ${(props) => props.status ? props.theme.StatusEmployee : props.theme.StatusGuest};
`;

const StatusText = styled.p`
  font-family: Montserrat, serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  color: ${(props) => props.status ? props.theme.StatusEmployeeText : props.theme.StatusGuestText};
`;

export const StatusEmployee = ({ status }) => {
    return (
        <StatusContainer status={status}>
            <StatusText status={status}>{status ? 'Сотрудник' : 'Гость'}</StatusText>
        </StatusContainer>
    )
}

export const StatusTransport = ({status}) => {
    return (
        <StatusContainer status={status}>
            <StatusText status={status}>{status ? 'Фирмы' : 'Гостевая'}</StatusText>
        </StatusContainer>
    )
}

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
  Expiration,
  ColumnHeader,
};
