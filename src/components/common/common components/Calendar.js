import React, {useState, useEffect} from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MonthYearSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const CalendarTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CalendarCell = styled.td`
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#007bff" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "inherit")};
`;

const Calendar = ({onSelectDate}) => {
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateCalendarMatrix = () => {
        const firstDay = new Date(selectedYear, selectedMonth, 1);
        const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
        const dayMatrix = [];
        let currentDay = 1;

        for (let row = 0; row < 6; row++) {
            const week = [];

            for (let col = 0; col < 7; col++) {
                if (
                    (row === 0 && col < firstDay.getDay()) ||
                    currentDay > daysInMonth
                ) {
                    week.push(null);
                } else {
                    week.push(currentDay);
                    currentDay++;
                }
            }

            dayMatrix.push(week);
        }

        return dayMatrix;
    };

    const handleDateClick = (day) => {
        const formattedDate = new Date(selectedYear, selectedMonth, day+1);
        const date = formattedDate.toISOString().split("T")[0]
        setSelectedDate(date);
        onSelectDate(date)
    };

    // useEffect(() => {
    //     // В этой функции можно добавить логику для обработки выбора даты
    //     console.log("Выбрана дата:", selectedDate);
    // }, [selectedDate]);

    const calendarMatrix = generateCalendarMatrix();

    return (
        <CalendarContainer>
            <CalendarHeader>
                <MonthYearSelect value={selectedMonth} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </MonthYearSelect>
                <MonthYearSelect value={selectedYear} onChange={handleYearChange}>
                    {Array.from({length: 10}, (_, i) => selectedYear - 5 + i).map(
                        (year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        )
                    )}
                </MonthYearSelect>
            </CalendarHeader>
            <CalendarTable>
                <thead>
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <th key={index}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {calendarMatrix.map((week, rowIndex) => (
                    <tr key={rowIndex}>
                        {week.map((day, dayIndex) => (
                            <CalendarCell
                                key={dayIndex}
                                onClick={() => day && handleDateClick(day)}
                                selected={day === new Date(selectedDate).getDate()}
                            >
                                {day}
                            </CalendarCell>
                        ))}
                    </tr>
                ))}
                </tbody>
            </CalendarTable>
        </CalendarContainer>
    );
};

export default Calendar;
