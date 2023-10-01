import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FakeEmployees from "../../fake_data/fake_persons.json";
import {
  ColumnHeader,
  EditDeleteButtons,
  EditDeleteContainer,
  Image,
  StatusEmployee,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderLabel,
  TableRow,
} from "../common/common components/tableComponents";
import EditIcon from "../visitors/images/Edit_blue.png";
import DeleteIcon from "../visitors/images/Delite.png";
import getAmountOfEmployeesByOrgId from "../common/someFunctions";

const Container = styled.div`
  flex: 1;
`;

const EmployeesTab = (org_id) => {
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
    // получаем список всех сотрудников и посетителей
    let receivedData = FakeEmployees;

    // фильтруем по организации
    let filteredData = getAmountOfEmployeesByOrgId(org_id.org_id);

    // Замена тира на слеши в дате
    function replaceDashWithSlash(dateString) {
      return dateString.replace(/-/g, "/");
    }

    // подготавливаем данные
    let preparedData = filteredData.map((item) => {
      // формирование срока действия пропуска
      let validDate =
        replaceDashWithSlash(item.valid_from_date) +
        " - " +
        replaceDashWithSlash(item.valid_until_date);

      // Формирование транспорта
      let trans = item.transport.mark + " / " + item.transport.grz;

      return {
        id: item.id,
        name: item.person_name,
        validDate: validDate,
        transport: trans,
        photo: item.vectors[0].photo,
        status: item.employee,
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
    <Container>
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
              title={"Срок действия пропуска"}
              sortFunc={handleSort}
              sortBy={"validDate"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Транспорт"}
              sortFunc={handleSort}
              sortBy={"transport"}
              sortOrder={sortOrder}
            />
            <TableHeaderLabel>Фото</TableHeaderLabel>
            <ColumnHeader
              title={"Статус"}
              sortFunc={handleSort}
              sortBy={"status"}
              sortOrder={sortOrder}
            />
            <TableHeaderLabel>Действия</TableHeaderLabel>
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableData style={{ width: "18%" }}>{item.name}</TableData>
              <TableData style={{ width: "25%" }}>{item.validDate}</TableData>
              <TableData style={{ width: "23%" }}>{item.transport}</TableData>
              <TableData style={{ width: "10%" }}>
                <Image src={item.photo} alt={item.name} />
              </TableData>
              <TableData style={{ width: "17%" }}>
                {<StatusEmployee status={item.status} />}
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
    </Container>
  );
};

export default EmployeesTab;
