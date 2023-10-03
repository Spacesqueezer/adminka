import React, { useEffect, useState } from "react";
import FakeTransport from "../../fake_data/Fake_transports.json";
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
  Expiration,
  ColumnHeader,
} from "../common/common components/tableComponents";
import {getListOfTransports} from "../../API_functions";

const TransportTable = () => {
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
    let receivedData = getListOfTransports();
    let preparedData = receivedData.map((item) => {
      const dateFrom = new Date(item.valid_from_date);
      const dateUntil = new Date(item.valid_until_date);
      const dateDelta = Math.floor(
        (dateUntil.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        id: item.id,
        mark: item.mark,
        grz: item.grz,
        org: item.organization.organization_name,
        date_delta: dateDelta,
        date_from: item.valid_from_date,
        date_until: item.valid_until_date,
        photo: item.photo,
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
              title={"Марка"}
              sortFunc={handleSort}
              sortBy={"mark"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"ГРЗ"}
              sortFunc={handleSort}
              sortBy={"grz"}
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
            <TableHeaderLabel>Фото</TableHeaderLabel>
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableData style={{ width: "19%" }}>{item.mark}</TableData>
              <TableData style={{ width: "18%" }}>{item.grz}</TableData>
              <TableData style={{ width: "25%" }}>{item.org}</TableData>
              <TableData style={{ width: "25%" }}>
                <Expiration
                  from={item.date_from}
                  until={item.date_until}
                  delta={item.date_delta}
                />
              </TableData>
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

export default TransportTable;
