import FakePersons from "./fake_data/fake_persons.json";
import FakeOrganizations from "./fake_data/FakeOrganizations.json";
import { v4 as uuidv4 } from "uuid";

const genUuid = () => {
  return uuidv4();
};

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

const getListOfOrganizations = () => {
  return FakeOrganizations;
};

export {
  getListOfPersons,
  updatePersonInformation,
  getListOfOrganizations,
  createNewPerson,
  genUuid,
};
