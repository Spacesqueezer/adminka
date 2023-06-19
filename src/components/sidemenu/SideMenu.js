import styled from "styled-components";
import MenuItem from "./MenuItem";

const SideMenu = () => {
  const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    background: #053480;
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
    color: #ffffff;
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

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: #ffffff;

    opacity: 0.5;
  `;
  return (
    <MenuWrapper>
      <MenuTitle>СКУД</MenuTitle>
      <MenuItems>
        <MenuItem title="Сотрудники" />
        <MenuItem title="Посетители" isSelected={true} />
        <MenuItem title="Организации" />
        <MenuItem title="Транспорт" />
        <MenuItem title="Журнал событий" />
        <MenuItem title="Отчеты" />
        <MenuItem title="Настройки" />
      </MenuItems>
      <MenuBottom>Система контроля и управления доступом (СКУД)</MenuBottom>
    </MenuWrapper>
  );
};

export default SideMenu;
