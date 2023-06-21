import styled from "styled-components";

const MenuItemWrapper = styled.div`
  position: relative;
  z-index: ${(props) => (props.isSelected ? "4" : "5")};
`;

const Title = styled.p`
  position: absolute;
  margin-left: 55px;
`;

const Image = styled.img`
  filter: ${(props) =>
    props.isSelected ? "none" : "brightness(0) invert(100%)"};
  margin-left: 20px;
`;

const TopCorner = styled.div`
  position: absolute;
  background: ${(props) => props.theme.SideMenuBackground};
  width: 20px;
  z-index: 3;
  height: 20px;
  top: -20px;
  right: 0;
  border-radius: 0 0 12px 0;
  display: ${(props) => (props.isSelected ? "block" : "none")};
`;

const BottomCorner = styled.div`
  position: absolute;
  z-index: 3;
  background: ${(props) => props.theme.SideMenuBackground};
  width: 20px;
  height: 20px;
  right: 0;
  bottom: -20px;
  border-radius: 0 12px 0 0;
  display: ${(props) => (props.isSelected ? "block" : "none")};
`;

const MenuBody = styled.div`
  position: relative;
  background: ${(props) =>
    props.isSelected
      ? props.theme.AppBackground
      : props.theme.SideMenuBackground};
  color: ${(props) =>
    props.isSelected
      ? props.theme.SideMenuItemTextSelected
      : props.theme.SideMenuItemText};
  height: 45px;
  border-radius: 12px 0 0 12px;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    background: ${(props) =>
      props.isSelected
        ? props.theme.AppBackground
        : props.theme.SideMenuBackgroundHover};
    cursor: pointer;
  }
`;

const CornersBack = styled.div`
  position: absolute;
  background: ${(props) =>
    props.isSelected
      ? props.theme.AppBackground
      : props.theme.SideMenuBackground};
  width: 20px;
  height: calc(100% + 40px);
  right: 0;
  top: -20px;
  display: ${(props) => (props.isSelected ? "block" : "none")};
`;

const MenuItem = ({ image, title, isSelected, onClick }) => (
  <MenuItemWrapper isSelected={isSelected} onClick={onClick}>
    <CornersBack isSelected={isSelected} />
    <TopCorner isSelected={isSelected} />
    <MenuBody isSelected={isSelected}>
      <Image src={image} isSelected={isSelected} />
      <Title>{title}</Title>
    </MenuBody>
    <BottomCorner isSelected={isSelected} />
  </MenuItemWrapper>
);

export default MenuItem;
