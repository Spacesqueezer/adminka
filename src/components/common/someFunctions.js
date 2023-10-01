import FakeEmpl from "../../fake_data/fake_persons.json";

const getAmountOfEmployeesByOrgId = (org_id) => {
  // Фильтруем список сотрудников и возвращаем только тех, у которых organization_id соответствует org_id
  return FakeEmpl.filter((employee) => employee.organization.id.toString() === org_id.toString());
};

export default getAmountOfEmployeesByOrgId;
