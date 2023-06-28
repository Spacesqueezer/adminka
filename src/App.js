import { ThemeProvider, Fonts } from "./ThemeContext";
import SideMenu from "./components/sidemenu/SideMenu";
import ContentArea from "./components/contentarea/ContentArea";
import styled from "styled-components";
import { useState } from "react";

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

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Сотрудники");
  const headers = {
    Сотрудники: "Список сотрудников",
    Посетители: "Список посетителей",
    Организации: "Список организаций",
    Транспорт: "Список транспорта",
    "Журнал событий": "Последние события",
    Отчеты: "Отчеты",
    Настройки: "Настройки",
  };

  return (
    <ThemeProvider>
      <Fonts />
      <StyledApp>
        <SideMenu selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} />
        <ContentArea
          selectedMenu={selectedMenu}
          title={headers[selectedMenu]}
        />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
