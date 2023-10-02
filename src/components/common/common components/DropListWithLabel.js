import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 250px;
  height: 63px;
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
  width: 250px;
`;

const DropListWithLabel = ({ label, data, selected, onSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedId(parseInt(selectedOption.value));
    onSelect(parseInt(selectedOption.value));
  };

  useEffect(() => {
    if (selected !== null) {
      setSelectedId(selected);
    } else {
      setSelectedId(""); // Если selected === null, сбросить выбор
    }
  }, [selected]);

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Select onChange={handleChange} value={selectedId}>
        <option value="">Выберите организацию</option>
        {Object.entries(data).map(([id, entry]) => (
          <option key={id} value={id}>
            {entry.name}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default DropListWithLabel;
