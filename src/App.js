import { ThemeProvider, Fonts } from "./ThemeContext";
import SideMenu from "./components/sidemenu/SideMenu";
import ContentArea from "./components/contentarea/ContentArea";
import styled from "styled-components";
import { useState } from "react";
import AddNewEmployee from "./components/employees/AddNewEmployee";
import AddNewVisitor from "./components/visitors/AddNewVisitor";

const StyledApp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(72, 67, 89, 0.4);
  z-index: 999;
`;

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 1000;
  border-radius: 12px;
`;

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Сотрудники");
  const [isModal, setIsModal] = useState(false);
  const [content, setContent] = useState(undefined);

  // Заголовки пунктов меню
  const headers = {
    Сотрудники: "Список сотрудников",
    Посетители: "Список посетителей",
    Организации: "Список организаций",
    Транспорт: "Список транспорта",
    "Журнал событий": "Последние события",
    Отчеты: "Отчеты",
    Настройки: "Настройки",
  };

  // Открытие модального окна. При вызове передаётся ключ на компонент
  const ShowModal = (modal) => {
    setContent(modals[modal]);
    setIsModal(true);
  };

  // Закрытие модального окна
  const CloseModal = () => {
    setIsModal(false);
  };

  // Модальные окна
  const modals = {
    newEmployee: <AddNewEmployee onClose={CloseModal} />,
    newVisitor: <AddNewVisitor onClose={CloseModal} />,
  };

  return (
    <ThemeProvider>
      <Fonts />
      <StyledApp>
        <SideMenu selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} />
        <ContentArea
          selectedMenu={selectedMenu}
          title={headers[selectedMenu]}
          showModal={ShowModal}
          closeModal={CloseModal}
        />
        {isModal && (
          <ModalBackground>
            <ModalContent>{content}</ModalContent>
          </ModalBackground>
        )}
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
