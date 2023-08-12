import React from "react";
import styled from "styled-components";
import CalendarIcon from "./../images/Calendar_ico.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 250px;
  height: 63px;
  margin-right: 30px;
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

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  //padding: 5px 30px 5px 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 40px;
  width: 100%;

  ::-webkit-calendar-picker-indicator {
    display: none;
    opacity: 0;
  }
`;

const Icon = styled.img`
  position: absolute;
  top: 12px;
  right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const DateInput = ({ label, value, name, onInput }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    onInput(name, value);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <InputContainer>
        <Input type="date" value={value} name={name} onChange={handleInput} />
        {/*<Icon src={CalendarIcon} alt="Calendar Icon" />*/}
      </InputContainer>
    </Container>
  );
};

export default DateInput;
