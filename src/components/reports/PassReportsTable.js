import React, { useEffect, useState } from "react";
// import DeleteIcon from "./images/Delite.png";
// import EditIcon from "./images/Edit_blue.png";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHeaderLabel,
  TableRow,
  TableData,
  TableWrapper,
  Image,
  EditDeleteContainer,
  EditDeleteButtons,
  Expiration,
  ColumnHeader,
} from "../common/common components/tableComponents";
import Pagination from "./../common/common components/Pagination";
import { getListOfPersons } from "../../API_functions";
import styled from "styled-components";

const PassReportsTable = ({ searchBy }) => {
  const [sortBy, setSortBy] = useState(""); // Column name to sort by
  const [sortOrder, setSortOrder] = useState(""); // Sort order: "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 9; // Number of items to show per page
  const [allData, setAllData] = useState("");
  const [tableData, setTableData] = useState("");

  useEffect(() => {
    //Фетчим данные с сервера
    fetchData();
  }, []);

  useEffect(() => {
    //Функция поиска
    if (searchBy === "") {
      fetchData();
    } else {
      const filteredData = allData.filter((item) => {
        // Производите поиск по всем полям и возвращайте элементы, которые соответствуют критерию поиска.
        return (
          item.name.includes(searchBy) ||
          item.surname.includes(searchBy) ||
          item.patronymic.includes(searchBy) ||
          item.org.includes(searchBy) ||
          item.transport.includes(searchBy)
        );
      });
      setTableData(filteredData);
    }
  }, [searchBy]);

  const fetchData = () => {
    let receivedData = getListOfPersons();
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
        allInfo: item,
      };
    });
    setTableData(preparedData);
    setAllData(preparedData);
  };

  // const editEmployee = (data) => {
  //   showModal("editEmployee", data);
  // };

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
      <TableWrapper>
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
                title={"Дата"}
                sortFunc={handleSort}
                sortBy={"date_time"}
                sortOrder={sortOrder}
              />
              <ColumnHeader
                title={"Выход из"}
                sortFunc={handleSort}
                sortBy={"transport"}
                sortOrder={sortOrder}
              />
              <ColumnHeader
                title={"Вход в"}
                sortFunc={handleSort}
                sortBy={"transport"}
                sortOrder={sortOrder}
              />
              <ColumnHeader
                title={"Должность"}
                sortFunc={handleSort}
                sortBy={"transport"}
                sortOrder={sortOrder}
              />
              <ColumnHeader
                title={"Подразделение"}
                sortFunc={handleSort}
                sortBy={"transport"}
                sortOrder={sortOrder}
              />
            </tr>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableData style={{ width: "14,9%" }}>
                  {/*ФИО*/}
                  {item.surname} {item.name[0]}. {item.patronymic[0]}.
                </TableData>
                <TableData style={{ width: "18,4%" }}>
                  {/*Организация*/}
                  {item.org}
                </TableData>
                <TableData style={{ width: "16,3%" }}>
                  {/*Дата*/}
                  <Expiration
                    from={item.date_from}
                    until={item.date_until}
                    delta={item.date_delta}
                  />
                </TableData>
                <TableData style={{ width: "14,9%" }}>
                  {/*Выход из*/}
                  Выход из
                </TableData>
                <TableData style={{ width: "11,5%" }}>
                  {/*Вход в*/}
                  Вход в
                </TableData>
                <TableData style={{ width: "14,6%" }}>
                  {/*Должность*/}
                </TableData>
                <TableData style={{ width: "9,4%" }}>
                  {/*Подразделение*/}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </TableContainer>
  );
};

export default PassReportsTable;
