import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 10px;
  height: 100%;
  width: 125px;
  border: 1px solid ${(props) => props.theme.InputBorder};
  border-radius: 6px;
  box-sizing: border-box;
`;

const Label = styled.p`
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: ${(props) => props.theme.GrayText};
`;

const FiltersButton = () => {
  return (
    <Wrapper>
      <Label>Разделы</Label>
    </Wrapper>
  );
};

export default FiltersButton;
