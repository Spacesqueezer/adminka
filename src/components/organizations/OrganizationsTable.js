import React, { useEffect, useState } from "react";
import FakePersons from "../../fake_persons.json";
import EditIcon from "../visitors/images/Edit_blue.png";
import DeleteIcon from "../visitors/images/Delite.png";
import {
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
  EditDeleteContainer,
  EditDeleteButtons,
  Expiration,
  ColumnHeader,
} from "../common/common components/tableComponents";
import { useTheme } from "styled-components";
import RedArrow from "../employees/images/red_arrow.png";
import GreenArrow from "../employees/images/green_arrow.png";
import SortArrow from "../employees/images/Sort_Arrow.png";

const OrganizationsTable = () => {
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
        birth_date: item.birth_date,
        destination: item.organization.organization_name,
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
              title={"Дата рождения"}
              sortFunc={handleSort}
              sortBy={"birth_date"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Куда"}
              sortFunc={handleSort}
              sortBy={"destination"}
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
              <TableData style={{ width: "17%" }}>
                {item.surname} {item.name[0]}. {item.patronymic[0]}.
              </TableData>
              <TableData style={{ width: "14%" }}>{item.birth_date}</TableData>
              <TableData style={{ width: "17%" }}>{item.destination}</TableData>
              <TableData style={{ width: "23%" }}>
                {/*{item.date_from} -> {item.date_until} : {item.date_delta}*/}
                <Expiration
                  from={item.date_from}
                  until={item.date_until}
                  delta={item.date_delta}
                />
              </TableData>
              <TableData style={{ width: "10%" }}>{item.transport}</TableData>
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

export default OrganizationsTable;
