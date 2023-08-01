import styled from "styled-components";
import React, { useRef, useState } from "react";
import ImagePlaceholder from "../images/empty-image.png";
import EditPencil from "../../employees/images/Edit_white.png";

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

export default ImagePicker;
