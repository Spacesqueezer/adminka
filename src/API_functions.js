import FakeOrganizations from "./fake_data/fake_organizations.json";
import FakeTransports from "./fake_data/fake_transport.json";
import FakePersons from "./fake_data/fake_persons.json";
import FakeEvents from "./fake_data/fake_events.json";
import FakeCameras from "./fake_data/fake_cameras.json";
import { v4 as uuidv4 } from "uuid";

const testMode = false;
const servAddress = "188.75.9.60:5000";

const sendFormDataToServer = (formData, endpoint) => {
  fetch(endpoint, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Данные успешно отправлены на сервер");
      } else {
        console.error("Ошибка при отправке данных на сервер");
      }
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных на сервер:", error);
    });
};

const sendDataToServer = (data, photo, endpoint) => {
  if (testMode) {
    console.log("------------------Отправка данных на сервер-----------------");
    console.log(data);
    if (photo) {
      console.log("------------------------------------------------------");
      console.log("Фотокарточка:");
      console.log(photo);
    }
    console.log("------------------------------------------------------");
  } else {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (photo) {
      formData.append("photo", photo);
    }
    sendFormDataToServer(formData, endpoint);
  }
};

const genUuid = () => {
  return uuidv4();
};
//------------Персоны------------
const getListOfPersons = () => {
  return FakePersons;
};

const updatePersonInformation = (data) => {
  const endpoint = `https://${servAddress}/api/Visitor/Update`;
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  if (data.photo) {
    formData.append("photo", data.photo);
  }
  sendFormDataToServer(formData, endpoint);
};

const createNewPerson = (data, photo) => {
  const endpoint = `https://${servAddress}/api/Visitor/Create`;
  sendDataToServer(data, photo, endpoint);
};

//-------------Организации-------------
const getListOfOrganizations = () => {
  return FakeOrganizations;
};

const createNewOrganization = (data) => {
  const endpoint = `https://${servAddress}/api/Organization/Create`;
  sendDataToServer(data, null, endpoint); // Передаем null вместо фото
};

//------------Транспорты---------------
const getListOfTransports = () => {
  return FakeTransports;
};

//------------Эвенты---------------
const getListOfEvents = () => {
  return FakeEvents;
};

//------------Камеры---------------
const getListOfCameras = () => {
  return FakeCameras;
};

export {
  getListOfPersons,
  createNewPerson,
  updatePersonInformation,
  getListOfOrganizations,
  createNewOrganization,
  getListOfTransports,
  getListOfEvents,
  getListOfCameras,
  genUuid,
  testMode,
};
