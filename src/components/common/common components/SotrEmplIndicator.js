import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const SotrEmplIndicator = ({ amount, text }) => {
  return (
    <Container>
      {amount} + {text}
    </Container>
  );
};

export default SotrEmplIndicator;
