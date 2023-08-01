import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 150px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalLogo = ({ source }) => {
  return (
    <Container>
      <Logo src={source} alt="no image" />
    </Container>
  );
};

export default ModalLogo;
