import styled from "styled-components";

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.ContentAreaBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 15px rgba(25, 43, 128, 0.1);
  border-radius: 12px;
  cursor: pointer;
`;

const Image = styled.img``;

const MenuButton = ({ image, callback }) => {
  return (
    <Wrapper onClick={callback}>
      <Image src={image} />
    </Wrapper>
  );
};

export default MenuButton;
