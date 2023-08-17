import React, { useState } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: red;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px;
  height: 438px;
`;

const TabHeader = styled.div`
  display: flex;
  flex: 46;
`;

const Tab = styled.div`
  padding: 10px 20px;
  width: 180px;
  border-radius: 7px 7px 0 0;
  margin-right: 10px;
  cursor: pointer;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.05);
  background-color: ${(props) =>
    props.isActive ? props.theme.White : props.theme.NotActiveTab};
  // border: 1px solid ${(props) => (props.isActive ? "#ccc" : "transparent")};
  //&:hover {
  //  background-color: #f0f0f0;
  //}
`;

// TODO доделать тени
const TabContent = styled.div`
  position: relative;
  display: flex;
  flex: 392;
  top: -1px;
  padding: 30px 35px 23px 35px;
  border-radius: 0 7px 7px 7px;
  background-color: ${(props) => props.theme.White};
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.05);
`;

const TabsSet = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <TabContainer>
      <TabHeader>
        {Object.keys(tabs).map((tabKey) => (
          <Tab
            key={tabKey}
            isActive={tabKey === activeTab}
            onClick={() => handleTabClick(tabKey)}
          >
            {tabKey}
          </Tab>
        ))}
      </TabHeader>
      <TabContent>{tabs[activeTab]}</TabContent>
    </TabContainer>
  );
};

export default TabsSet;
