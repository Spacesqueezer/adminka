import React, { useEffect, useState } from "react";
import FakeEvents from "../../fake_data/2/Fake_events.json";
import FakePersons from "../../fake_data/2/Fake_persons.json";
import DeleteIcon from "../employees/images/Delite.png";
import EditIcon from "../employees/images/Edit_blue.png";
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
  ColumnHeader,
} from "../common/common components/tableComponents";

const EventsTable = () => {
  const [sortBy, setSortBy] = useState(""); // Column name to sort by
  const [sortOrder, setSortOrder] = useState(""); // Sort order: "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 9; // Number of items to show per page
  const [tableData, setTableData] = useState("");

  useEffect(() => {
    //Фетчим данные с сервера
    fetchData();
  }, []);

  // Получение ФИО субъекта события по ID
  const getSubject = (objID) => {
    const obj = FakePersons.find((item) => item.id === objID);
    const name =
      obj.person_surname +
      " " +
      obj.person_name[0] +
      ". " +
      obj.person_patronymic[0] +
      ".";
    return name;
  };

  const fetchData = () => {
    let receivedData = FakeEvents;
    let preparedData = receivedData.map((item) => {
      return {
        id: item.id,
        date: item.dateTime,
        time: item.timeTime,
        subject: getSubject(item.visitor_id),
        photo: item.photo,
        device_id: item.cam_id,
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
              title={"Номер события"}
              sortFunc={handleSort}
              sortBy={"id"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Дата"}
              sortFunc={handleSort}
              sortBy={"date"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Время"}
              sortFunc={handleSort}
              sortBy={"time"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Субъект события"}
              sortFunc={handleSort}
              sortBy={"subject"}
              sortOrder={sortOrder}
            />
            <TableHeaderLabel>Фото</TableHeaderLabel>
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              {/*TODO: выровнять проценты как на макете*/}
              <TableData style={{ width: "19%" }}>{item.id}</TableData>
              <TableData style={{ width: "18%" }}>{item.date}</TableData>
              <TableData style={{ width: "25%" }}>{item.time}</TableData>
              <TableData style={{ width: "25%" }}>{item.subject} </TableData>
              <TableData>
                <Image src={item.photo} alt={item.subject} />
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

export default EventsTable;
