import React from "react";
import EmployeesScreen from "../employees/Employees";
import VisitorsScreen from "../visitors/Visitors";
import TransportScreen from "../transport/Transport";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 54;
  background: #f5f5f5;
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

  color: #1352b7;
`;
const Body = styled.div`
  background: white;
  position: absolute;

  left: 360px;
  top: 158px;
  right: 40px;
  bottom: 30px;

  /* Frame_S */

  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
`;

const ContentArea = ({ selectedMenu, title }) => {
  return (
    <Wrapper>
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
