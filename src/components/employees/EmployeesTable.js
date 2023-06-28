import React, { useState } from "react";
import styled from "styled-components";
import FakeData from "../../fake_data.json";

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
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

const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  overflow: hidden;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${(props) => props.theme.TableRowEvenBackground};
  }
  td {
    height: 52px;
  }
`;

const TableData = styled.td`
  padding: 8px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
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

const data = FakeData;

const EmployeesTable = () => {
  const [sortBy, setSortBy] = useState(""); // Column name to sort by
  const [sortOrder, setSortOrder] = useState(""); // Sort order: "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 9; // Number of items to show per page

  // Sort the data based on the selected column
  const sortedData = [...data].sort((a, b) => {
    if (sortBy && sortOrder) {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

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
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader onClick={() => handleSort("name")}>ФИО</TableHeader>
            <TableHeader onClick={() => handleSort("organization")}>
              Организация
            </TableHeader>
            <TableHeader onClick={() => handleSort("expiration")}>
              Срок действия
            </TableHeader>
            <TableHeader onClick={() => handleSort("transport")}>
              Транспорт
            </TableHeader>
            <TableHeader>Фото</TableHeader>
          </tr>
        </thead>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableData>{item.name}</TableData>
              <TableData>{item.organization}</TableData>
              <TableData>{item.expiration}</TableData>
              <TableData>{item.transport}</TableData>
              <TableData>
                <Image src={item.photo} alt={item.name} />
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
