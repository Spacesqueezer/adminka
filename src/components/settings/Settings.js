import CameraSettings from "./CameraSettings";
import Devices from "./Devices";
import TabsSet from "../common/common components/TabsSet";
import styled from "styled-components";
import ButtonWithIcon from "../header_menu/ButtonWithIcon";
import AddIcon from "../transport/images/Add_button.png";
import {useState} from "react";

const tabs = {
  "Настройки камеры": <CameraSettings />,
  Устройства: <Devices />,
};

const SettingsScreenContainer = styled.div`
  flex: 1;
  display: flex;
`;
const AddButtonContainer = styled.div`
  position: absolute;
  right: 0;
`;

const AddCamera = () => {
  alert("add camera");
};

const AddDevice = () => {
  alert("add device");
};

const SettingsScreen = () => {
  const [activeTab, setActiveTab] = useState("Настройки камеры");

  const changeCallbackFunction = (tabKey) => {
    setActiveTab(tabKey);
  };

  // Определите функцию коллбэка в зависимости от активной вкладки
  let callbackFunction;
  if (activeTab === "Настройки камеры") {
    callbackFunction = AddCamera;
  } else if (activeTab === "Устройства") {
    callbackFunction = AddDevice;
  }

  return (
      <SettingsScreenContainer>
        <AddButtonContainer>
          <ButtonWithIcon
              label={"Добавить"}
              icon={AddIcon}
              backColor={(props) => props.theme.LightBlue}
              textColor={(props) => props.theme.White}
              callback={callbackFunction}
          />
        </AddButtonContainer>
        <TabsSet tabs={tabs} onTabChange={changeCallbackFunction} />
      </SettingsScreenContainer>
  );
};

export default SettingsScreen;