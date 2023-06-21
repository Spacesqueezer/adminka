import styled from "styled-components";
import CustomInput from "./CustomInput";
import FiltersButton from "./Filters";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
`;

const HeaderMenu = () => {
  return (
    <Wrapper>
      <ElementsContainer>
        <CustomInput />
        <FiltersButton />
      </ElementsContainer>
    </Wrapper>
  );
};

export default HeaderMenu;
