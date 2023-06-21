import React, { useContext } from "react";
import EmployeesScreen from "../employees/Employees";
import VisitorsScreen from "../visitors/Visitors";
import TransportScreen from "../transport/Transport";
import MenuButton from "./MenuButton";
import ChangeThemeImg from "./images/theme_change.png";
import LogoutImg from "./images/logout.png";
import styled from "styled-components";
import { ThemeContext } from "../../ThemeContext";

const Wrapper = styled.div`
  flex: 54;
  background: ${(props) => props.theme.AppBackground};
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
  width: 253px;
  height: 30px;
  left: 361px;
  top: 102px;

  font-family: "Roboto";
  text-align: left;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;

  color: ${(props) => props.theme.Header};
`;

const Body = styled.div`
  background: ${(props) => props.theme.ContentAreaBackground};
  position: absolute;

  left: 360px;
  top: 158px;
  right: 40px;
  bottom: 30px;

  /* Frame_S */

  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
`;

const Logout = () => {
  alert("Выйтинах");
};

const ContentArea = ({ selectedMenu, title }) => {
  const { toggleTheme } = useContext(ThemeContext);

  const ChangeTheme = () => {
    toggleTheme();
  };
  return (
    <Wrapper>
      <Menu>
        <MenuButton image={ChangeThemeImg} callback={ChangeTheme} />
        <MenuButton image={LogoutImg} callback={Logout} />
      </Menu>
      <Header>{title}</Header>
      <Body>
        {(() => {
          switch (selectedMenu) {
            case "Сотрудники":
              return <EmployeesScreen />;
            case "Посетители":
              return <VisitorsScreen />;
            case "Транспорт":
              return <TransportScreen />;
          }
        })()}
      </Body>
    </Wrapper>
  );
};

export default ContentArea;
