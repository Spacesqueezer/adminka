import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 250px;
  height: 63px;
  margin-right: 30px;
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

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 100%;
`;

const DropListWithLabel = ({ label, data }) => {
  const [selectedId, setSelectedId] = useState(null);

  const dataArray = Object.values(data); // Преобразуем JSON-объект в массив

  const handleChange = (event) => {
    const selectedName = event.target.value;
    const selectedEntry = dataArray.find(
      (entry) => entry.name === selectedName
    );

    if (selectedEntry) {
      setSelectedId(selectedEntry.id);
    }
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Select onChange={handleChange}>
        <option value="">Выберите организацию</option>
        {dataArray.map((entry) => (
          <option key={entry.id} value={entry.name}>
            {entry.name}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default DropListWithLabel;
