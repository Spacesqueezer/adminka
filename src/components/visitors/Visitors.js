import styled from "styled-components";

const Wrapper = styled.div`
  background: aqua;
`;

const VisitorsScreen = ({ showModal }) => {
  const onClick = () => {
    showModal("newVisitor");
  };

  return (
    <Wrapper>
      Визиторов экран
      <button onClick={onClick}>Открыть модалку</button>
    </Wrapper>
  );
};

export default VisitorsScreen;
