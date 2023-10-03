import React, { useEffect, useState } from "react";
import FakeOrganizations from "../../fake_data/FakeOrganizations.json";
import EditIcon from "../visitors/images/Edit_blue.png";
import DeleteIcon from "../visitors/images/Delite.png";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableData,
  Pagination,
  PaginationButton,
  EditDeleteContainer,
  EditDeleteButtons,
  ColumnHeader,
} from "../common/common components/tableComponents";
import { getListOfOrganizations } from "../../API_functions";

const OrganizationsTable = ({ showModal }) => {
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
    let receivedData = getListOfOrganizations();
    let preparedData = receivedData.map((item) => {
      return {
        id: item.id,
        name: item.organization_name,
        address: item.organization_address,
        phone: item.organization_phone,
        email: item.organization_email,
        org_floor: item.organization_floor,
        office: item.office,
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
              title={"Название"}
              sortFunc={handleSort}
              sortBy={"name"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Юр. адрес"}
              sortFunc={handleSort}
              sortBy={"address"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Контакты"}
              sortFunc={handleSort}
              sortBy={"phone"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Этаж"}
              sortFunc={handleSort}
              sortBy={"org_floor"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Офис"}
              sortFunc={handleSort}
              sortBy={"office"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Сотрудники"}
              sortFunc={handleSort}
              sortBy={"transport"}
              sortOrder={sortOrder}
            />
            <ColumnHeader
              title={"Транспорт"}
              sortFunc={handleSort}
              sortBy={"transport"}
              sortOrder={sortOrder}
            />
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableData style={{ width: "19%" }}>{item.name}</TableData>
              <TableData style={{ width: "28%" }}>{item.address}</TableData>
              <TableData style={{ width: "14%" }}>{item.phone}</TableData>
              <TableData style={{ width: "9%" }}>{item.org_floor}</TableData>
              <TableData style={{ width: "9%" }}>Офис {item.office}</TableData>
              <TableData style={{ width: "9%" }}>{"Sotr"}</TableData>{" "}
              <TableData style={{ width: "7%" }}>{"Mashinki"}</TableData>
              <TableData>
                <EditDeleteContainer>
                  <EditDeleteButtons
                    src={EditIcon}
                    org_id={item.id}
                    orgData={item}
                    onClick={() => showModal("editOrganization", item)}
                  />
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
