import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-left: auto; /* Прижимаем компонент вправо */
  text-align: right; /* Это можно оставить, если вам нужно выровнять текст внутри */
`;

const PaginationButtonContainer = styled.div`
  margin-left: 5px;
  padding: 5px 10px;
`;

const PaginationButton = styled.div`
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  // background-color: ${props => props.active ? 'lightblue' : 'transparent'}; /* Голубой цвет для активной страницы */
  color: ${props => props.active ? '#0C7AFF' : '#ACAAB4'}; /* Белый цвет для цифры активной страницы */
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const pagesToShow = 1; // Количество страниц слева и справа от активной
  const ellipsis = " ... "; // Многоточие

  const getPaginationRange = () => {
    const start = Math.max(1, currentPage - pagesToShow);
    const end = Math.min(totalPages, currentPage + pagesToShow);

    let range = [];
    if (start > 1) {
      range.push(1);
      if (start > 2) {
        range.push(null); // Многоточие между первой страницей и предыдущей
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        range.push(null); // Многоточие между последней страницей и следующей
      }
      range.push(totalPages);
    }

    return range;
  };

  return (
      <Container>
        {getPaginationRange().map((page) => {
          if (page === null) {
            return <span key="ellipsis">{ellipsis}</span>;
          } else {
            return (
                <PaginationButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                >
                  {page}
                </PaginationButton>
            );
          }
        })}
        <PaginationButton
            key="prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
          &lt; {/* Стрелка влево */}
        </PaginationButton>
        <PaginationButton
            key="next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
          &gt; {/* Стрелка вправо */}
        </PaginationButton>
      </Container>
  );
};

export default Pagination;
