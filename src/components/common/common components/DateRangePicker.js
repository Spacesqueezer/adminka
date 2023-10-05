import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 250px;
  height: 63px;
`;

const InputField = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 100%;
`;

const Label = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
  text-align: left;
  margin: 0;
  color: ${(props) => props.theme.LightGray};
`;

const CalendarsContainer = styled.div`
  position: absolute;
  display: flex;
  width: 400px;
  height: 300px;
  background-color: #d0cfcf;
  top: -310px;
  left: -150px;
  border-radius: 15px;
  padding: 15px;
`;
//
// const Calendar = styled.div`
//   width: 50%; /* Равномерно размещаем календари внутри контейнера */
//   background-color: #fff; /* Фон календаря */
//   margin: 10px;
// `;

const DateRangeSelector = ({ label, onSelectRange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [untilDate, setUntilDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    // Добавляем обработчик клика на всем документе
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    // Добавляем обработчик события только когда контейнер видим
    if (isVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    // Убираем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    if (fromDate && untilDate) {
      onSelectRange({ fromDate, untilDate });
    }
  }, [fromDate, untilDate]);

  const handleInputClick = () => {
    setIsVisible(true);
  };

  return (
    <Container ref={containerRef}>
      {isVisible && (
        <CalendarsContainer>
          <Calendar onSelectDate={(date) => setFromDate(date)} />
          <Calendar onSelectDate={(date) => setUntilDate(date)} />
        </CalendarsContainer>
      )}
      <Label>{label}</Label>
      <InputField
        onClick={handleInputClick}
        value={`${fromDate.toString().replace(/-/g, ".")} - ${untilDate
          .toString()
          .replace(/-/g, ".")}`}
      />
    </Container>
  );
};

export default DateRangeSelector;
