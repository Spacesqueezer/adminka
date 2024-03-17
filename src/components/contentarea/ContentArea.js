import React, { useContext } from "react";
import EmployeesScreen from "../employees/Employees";
import VisitorsScreen from "../visitors/Visitors";
import TransportScreen from "../transport/Transport";
import MenuButton from "./MenuButton";
import ChangeThemeImg from "./images/theme_change.png";
import LogoutImg from "./images/logout.png";
import styled from "styled-components";
import { ThemeContext } from "../../ThemeContext";
import OrganizationsScreen from "../organizations/Organizations";
import EventsScreen from "../events/Events";
import ReportsScreen from "../reports/Reports";
import SettingsScreen from "../settings/Settings";

const Wrapper = styled.div`
  flex: 54;
  height: 100%;
  background: ${(props) => props.theme.ModalBackground};
`;

const Menu = styled.div`
  position: absolute;
  width: 110px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  right: 40px;
  top: 28px;
`;

const Header = styled.p`
  position: absolute;
  height: 30px;
  left: 361px;
  top: 102px;

  font-family: "Roboto", sans-serif;
  text-align: left;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;

  color: ${(props) => props.theme.Header};
`;

const Body = styled.div`
  display: flex;
  // background: ${(props) => props.theme.White};
  position: absolute;

  left: 360px;
  top: 158px;
  right: 40px;
  bottom: 30px;

  min-width: 570px;

  //box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.05);

  //padding: 30px 40px;
`;

const Logout = () => {
  alert("Выйтинах");
};

const ContentArea = ({ selectedMenu, title, showModal, closeModal }) => {
  const { toggleTheme } = useContext(ThemeContext);

  const ChangeTheme = () => {
    toggleTheme();
  };

  const screens = {
    Сотрудники: <EmployeesScreen showModal={showModal} />,
    Посетители: <VisitorsScreen showModal={showModal} />,
    Организации: <OrganizationsScreen showModal={showModal} />,
    Транспорт: <TransportScreen showModal={showModal} />,
    "Журнал событий": <EventsScreen />,
    Отчёты: <ReportsScreen />,
    Настройки: <SettingsScreen />,
  };

  return (
    <Wrapper>
      <Menu>
        <MenuButton image={ChangeThemeImg} callback={ChangeTheme} />
        <MenuButton image={LogoutImg} callback={Logout} />
      </Menu>
      <Header>{title}</Header>
      <Body>{screens[selectedMenu]}</Body>
    </Wrapper>
  );
};

export default ContentArea;
