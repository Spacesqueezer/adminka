import FakeEmpl from "../../fake_data/fake_persons.json";
import FakeTrans from "../../fake_data/Fake_transports.json";

// TODO: сделать фетчи

const getAmountOfEmployeesByOrgId = (org_id) => {
  // Фильтруем список сотрудников и возвращаем только тех, у которых organization_id соответствует org_id
  return FakeEmpl.filter(
    (employee) => employee.organization.id.toString() === org_id.toString()
  );
};

const getAmountOfTransportByOrgId = (org_id) => {
  return FakeTrans.filter(
    (trans) => trans.organization.id.toString() === org_id.toString()
  );
};

export { getAmountOfEmployeesByOrgId, getAmountOfTransportByOrgId };
