import styled from "styled-components";
import MenuItem from "./MenuItem";
import { useState } from "react";
import EmployeeImg from "./images/employee.png";
import VisitorsImg from "./images/visitor.png";
import TransportImg from "./images/transport.png";
import OrganizationImg from "./images/organization.png";
import JournalImg from "./images/journal.png";
import SettingsImg from "./images/settings.png";
import ReportsImg from "./images/reports.png";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  min-width: 200px;
  background: ${(props) => props.theme.SideMenuBackground};
  height: 100%;
  flex: 10;
`;
const MenuTitle = styled.p`
  position: absolute;
  width: 87px;
  height: 20px;
  left: 29px;
  top: 37px;
  font-family: "Eastman", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 38px;
  letter-spacing: 0.1em;
  color: ${(props) => props.theme.SideMenuTitle};
`;
const MenuItems = styled.div`
  position: relative;
  width: 90%;
  left: 10%;
  margin: 0;
  height: 42%;
  top: 14%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MenuBottom = styled.p`
  position: relative;
  width: 73%;
  height: 34px;
  left: 41px;
  bottom: 50px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.SideMenuTitle};
  opacity: 0.5;
`;

const menuItems = [
  { title: "Сотрудники", image: EmployeeImg },
  { title: "Посетители", image: VisitorsImg },
  { title: "Организации", image: OrganizationImg },
  { title: "Транспорт", image: TransportImg },
  { title: "Журнал событий", image: JournalImg },
  { title: "Отчеты", image: ReportsImg },
  { title: "Настройки", image: SettingsImg },
];

const SideMenu = ({ onMenuSelect }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Сотрудники");

  const handleMenuClick = (menuItem) => {
    onMenuSelect(menuItem);
    setSelectedMenuItem(menuItem);
  };

  return (
    <MenuWrapper>
      <MenuTitle>СКУД</MenuTitle>
      <MenuItems>
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            image={item.image}
            isSelected={selectedMenuItem === item.title}
            onClick={() => handleMenuClick(item.title)}
          />
        ))}
      </MenuItems>
      <MenuBottom>Система контроля и управления доступом (СКУД)</MenuBottom>
    </MenuWrapper>
  );
};

export default SideMenu;
