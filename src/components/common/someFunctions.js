import FakeEmpl from "../../fake_data/fake_persons.json";
import {getListOfTransports} from "../../API_functions";

// TODO: сделать фетчи

const getAmountOfEmployeesByOrgId = (org_id) => {
  // Фильтруем список сотрудников и возвращаем только тех, у которых organization_id соответствует org_id
  return FakeEmpl.filter(
    (employee) => employee.organization.id.toString() === org_id.toString()
  );
};

const getAmountOfTransportByOrgId = (org_id) => {
  let transports = getListOfTransports()
  return transports.filter(
    (trans) => trans.organization.id.toString() === org_id.toString()
  );
};

export { getAmountOfEmployeesByOrgId, getAmountOfTransportByOrgId };
