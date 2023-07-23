import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import FakePersons from "../../fake_persons.json";
import SortArrow from "./images/Sort_Arrow.png";
import GreenArrow from "./images/green_arrow.png";
import RedArrow from "./images/red_arrow.png";
import DeleteIcon from "./images/Delite.png";
import EditIcon from "./images/Edit.png";

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead``;

const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  overflow: hidden;
`;

const TableHeaderLabel = styled.th`
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

const TableRow = styled.tr`
  align-items: center;
  // &:nth-child(even) {
  //   background: ${(props) => props.theme.TableRowEvenBackground};
  // }
  td {
    height: 52px;
    vertical-align: middle;
  }
`;

const TableData = styled.td`
  padding: 8px;
  text-overflow: ellipsis;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 12px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 1;
`;

const PaginationButton = styled.button`
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

const ExpirationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ExpirationDate = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;

const ExpirationArrow = styled.img`
  width: 15px;
  height: 10px;
`;

const ExpirationDeltaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 20px;
  border-radius: 6px;
  margin-left: 7px;
`;

const ExpirationDeltaText = styled.p`
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
`;

const EditDeleteButtons = styled.img``;

const EditDeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 18px;
  width: 62px;
  justify-content: space-between;
`;

const Expiration = ({ from, until, delta }) => {
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

const ColumnHeader = ({ title, sortOrder, sortBy: sortByOrder, sortFunc }) => {
  const isAscending = sortOrder === "asc";
  const rotateDegree = isAscending ? 0 : 180;

  return (
    <TableHeaderLabel onClick={() => sortFunc(sortByOrder)}>
      {title}{" "}
      <img
        src={SortArrow}
        style={{ transform: `rotate(${rotateDegree}deg)` }}
      />
    </TableHeaderLabel>
  );
};

const EmployeesTable = () => {
  const [sortBy, setSortBy] = useState(""); // Column name to sort by
  const [sortOrder, setSortOrder] = useState(""); // Sort order: "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 9; // Number of items to show per page
  const [tableData, setTableData] = useState("");

  useEffect(() => {
    //Фетчим данные с сервера
    fetchData();
  }, []);

  const fetchData = () => {
    let receivedData = FakePersons;
    let preparedData = receivedData.map((item) => {
      const dateFrom = new Date(item.valid_from_date);
      const dateUntil = new Date(item.valid_until_date);
      const dateDelta = Math.floor(
        (dateUntil.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        id: item.id,
        name: item.person_name,
        surname: item.person_surname,
        patronymic: item.person_patronymic,
        date_from: item.valid_from_date,
        date_until: item.valid_until_date,
        date_delta: dateDelta,
        org: item.organization.organization_name,
        photo: item.vectors[0].photo,
        transport: item.transport.mark + " / " + item.transport.grz,
      };
    });
    setTableData(preparedData);
  };

  // Sort the data based on the selected column
  const sortedData = [...tableData].sort((a, b) => {
    const aValue = getNestedValue(a, sortBy);
    const bValue = getNestedValue(b, sortBy);

    if (sortOrder === "asc") {
      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue);
      } else {
        return aValue - bValue;
      }
    } else {
      if (typeof aValue === "string" && typeof bValue === "string") {
        return bValue.localeCompare(aValue);
      } else {
        return bValue - aValue;
      }
    }
  });

  function getNestedValue(obj, path) {
    const keys = path.split(".");
    let value = obj;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        break;
      }
    }
    return value;
  }

  // Paginate the data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Toggle the sort order when a column header is clicked
  const handleSort = (columnName) => {
    if (columnName === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <ColumnHeader
              title={"ФИО"}
              sortFunc={handleSort}
              sortBy={"name"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Организация"}
              sortFunc={handleSort}
              sortBy={"org"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Срок действия"}
              sortFunc={handleSort}
              sortBy={"date_delta"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Транспорт"}
              sortFunc={handleSort}
              sortBy={"transport"}
              sortOrder={sortOrder}
            />
            <TableHeaderLabel>Фото</TableHeaderLabel>
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableData style={{ width: "23%" }}>
                {item.surname} {item.name[0]}. {item.patronymic[0]}.
              </TableData>
              <TableData style={{ width: "25%" }}>{item.org}</TableData>
              <TableData style={{ width: "29%" }}>
                {/*{item.date_from} -> {item.date_until} : {item.date_delta}*/}
                <Expiration
                  from={item.date_from}
                  until={item.date_until}
                  delta={item.date_delta}
                />
              </TableData>
              <TableData style={{ width: "23%" }}>{item.transport}</TableData>
              <TableData>
                <Image src={item.photo} alt={item.name} />
              </TableData>
              <TableData>
                <EditDeleteContainer>
                  <EditDeleteButtons src={EditIcon} />
                  <EditDeleteButtons src={DeleteIcon} />
                </EditDeleteContainer>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationButton
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </Pagination>
    </TableContainer>
  );
};

export default EmployeesTable;
