import FakePersons from "./fake_data/fake_persons.json";
import FakeOrganizations from "./fake_data/new_fake/fake_organizations.json";
import FakeTransports from "./fake_data/new_fake/fake_transport.json";
import { v4 as uuidv4 } from "uuid";

const genUuid = () => {
  return uuidv4();
};
//------------Персоны------------
const getListOfPersons = () => {
  return FakePersons;
};

const updatePersonInformation = (data) => {
  console.log("----------------------Апдейт инфы----------------------");
  console.log(data);
  console.log("------------------------------------------------------");
};

const createNewPerson = (data) => {
  console.log("----------------------Создаётся персонаж----------------------");
  console.log(data);
  console.log("------------------------------------------------------");
};

//-------------Организации-------------
const getListOfOrganizations = () => {
  return FakeOrganizations;
};

const createNewOrganization = (data) => {
  console.log("--------------------Создаётся организация--------------------");
  console.log(data);
  console.log("------------------------------------------------------");
};

//------------Транспорты---------------
const getListOfTransports = () => {
  return FakeTransports;
};

export {
  getListOfPersons,
  createNewPerson,
  updatePersonInformation,
  getListOfOrganizations,
  createNewOrganization,
  getListOfTransports,
  genUuid,
};
