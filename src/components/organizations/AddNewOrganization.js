import React from "react";
import styled from "styled-components";
import {
  UpSide,
  DownSide,
} from "../common/common components/modalWindowComponents";

const Container = styled.div`
  width: 1220px;
  height: 900px;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
`;

const AddNewOrganization = ({ onClose }) => {
  return (
    <Container>
      <UpSide></UpSide>
      <DownSide></DownSide>
    </Container>
  );
};

export default AddNewOrganization;
