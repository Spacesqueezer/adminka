import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) =>
    props.type === "confirm" ? props.theme.BlueBackground : props.theme.White};
  color: ${(props) =>
    props.type === "confirm" ? props.theme.White : props.theme.Black};
  width: 115px;
  height: 40px;
  padding: 10px 25px 10px 25px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.BlueBackground};
  gap: 10px;
  cursor: pointer;
`;

const ConfirmButton = ({ label, callback, type }) => {
  return (
    <Button type={type} onClick={callback}>
      {label}
    </Button>
  );
};

export default ConfirmButton;
