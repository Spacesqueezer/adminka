import React, { useRef, useState } from "react";
import styled from "styled-components";
import ImagePlaceholder from "./images/empty-image.png";
import EditPencil from "./images/Edit_white.png";
import InputWithLabel from "../common components/InputWithLabel";

const Container = styled.div`
  width: 1220px;
  height: 770px;
  background: white;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
`;

const LeftSide = styled.div`
  flex: 33;
  background: #f4f8fb;
  border-radius: 12px;
`;

const RightSide = styled.div`
  flex: 89;
  display: flex;
  flex-direction: column;
  padding-left: 36px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 71;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 535;
`;

const Footer = styled.div`
  flex: 114;
`;

const Separator = styled.hr`
  border: 1px solid #dbd7d5;
  width: 100%;
  margin: 0;
`;

const HeaderLabel = styled.p`
  margin-top: 40px;
  margin-bottom: 10px;
  font-family: Roboto, sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0;
  text-align: left;
  color: ${(props) => props.theme.Header};
`;

const CloseButton = styled.button`
  width: 12px;
  height: 12px;
  margin-top: 28px;
  margin-right: 28px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    background-color: ${(props) => props.theme.LightGray};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const InputsBlock = styled.div``;

const BlockHeader = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
`;

const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

//----------------------------------------IMAGE PICKER----------------------------------------
const ImgPickContainer = styled.div`
  position: relative;
  width: 250px;
  height: 320px;
  margin-left: 37px;
  margin-top: 40px;
  border-radius: 12px;
  overflow: hidden;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoadImageButton = styled.div`
  width: 45px;
  height: 45px;
  background: ${(props) => props.theme.BlueBackground};
  position: absolute;
  border-radius: 8px;
  left: 16px;
  bottom: 15px;
  cursor: pointer;
  padding: 13px;
  box-sizing: border-box;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectPhotoEditButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImagePicker = () => {
  const [image, setImage] = useState(ImagePlaceholder);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <ImgPickContainer>
      <UserImage src={image} alt="error" />
      <LoadImageButton onClick={handleLoadButtonClick}>
        <SelectPhotoEditButtonImage src={EditPencil} alt="edit" />
        <HiddenInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </LoadImageButton>
    </ImgPickContainer>
  );
};

//--------------------------------------------------------------------------------------------

const AddNewEmployee = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
  });

  const submitFunction = () => {};

  return (
    <Container>
      <LeftSide>
        <ImagePicker />
      </LeftSide>
      <RightSide>
        <Header>
          <HeaderLabel>Добавить нового сотрудника</HeaderLabel>
          <CloseButton onClick={onClose} />
        </Header>
        <Separator />
        <Body>
          <InputsBlock style={{ flex: 222 }}>
            <BlockHeader>Данные сотрудника</BlockHeader>
            <InputsRow>
              <InputWithLabel label={"Имя"} type={"text"} />
              <InputWithLabel label={"Фамилия"} type={"text"} />
              <InputWithLabel label={"Отчество"} type={"text"} />
            </InputsRow>
            <InputsRow>
              <InputWithLabel
                label={"Наименование организации"}
                type={"text"}
              />
              <InputWithLabel
                  label={"Должность"}
                  type={"text"}
              />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 139 }}>
            <BlockHeader>Пропуск сотрудника</BlockHeader>
            <InputsRow>
            <InputWithLabel
                label={"Дата начала действия"}
                type={"date"}
            />
            <InputWithLabel
                label={"Окончание срока действия"}
                type={"date"}
            />
            </InputsRow>
          </InputsBlock>
          <InputsBlock style={{ flex: 145 }}>
            <BlockHeader>Транспортное средство</BlockHeader>
            <InputsRow>
              <InputWithLabel
                  label={"Модель"}
                  type={"text"}
              />
              <InputWithLabel
                  label={"Гос. номер"}
                  type={"text"}
              />
              <InputWithLabel
                  label={"Окончание срока действия"}
                  type={"date"}
              />
            </InputsRow>
          </InputsBlock>
        </Body>
        <Separator />
        <Footer>
          <button onClick={submitFunction}>САБМИТ</button>
        </Footer>
      </RightSide>
    </Container>
  );
};

export default AddNewEmployee;
