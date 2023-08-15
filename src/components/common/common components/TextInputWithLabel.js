import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 250px;
  min-width: 250px;
  height: 63px;
  //margin-right: 30px;
`;

const Label = styled.label`
  font-family: Roboto, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
  text-align: left;
  color: ${(props) => props.theme.LightGray};
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 100%;
`;

const TextInputWithLabel = ({ label, name, value, onInput, style }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    onInput(name, value);
  };

  return (
    <Container style={{ ...style }}>
      <Label>{label}</Label>
      <Input value={value} onChange={handleInput} name={name} />
    </Container>
  );
};

export default TextInputWithLabel;