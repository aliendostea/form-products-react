import { useState } from "react";
import styled from "styled-components";
import { useProducts } from "@/hooks/use-products";
import { useFilters } from "@/hooks/use-filters";
import { useLayout } from "@/hooks/use-layout";

export const TestCurrentDataStyled = styled.div`
  width: 24rem;
  display: grid;
  grid-template-columns: repeat(2, min-content);
  justify-content: space-between;
  color: white;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 18px;
  font-weight: 416;
  padding: 14px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.329);
  position: fixed;
  bottom: 9px;
  left: 150px;
  z-index: 1000;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-ligth);
    border-radius: 50%;
    background-color: transparent;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    z-index: 10;
  }
`;

export const BoxSpan = styled.div`
  display: grid;

  & span {
    display: block;
    white-space: nowrap;
  }
`;

const TestCurrentData = () => {
  const { products } = useProducts({});
  const { filters } = useFilters();
  const { state } = useLayout();

  const { stringToSearch } = filters;
  const [isActive, setIsActive] = useState(true);

  const handleClick = () => {
    setIsActive(false);
  };

  //// JSON.stringify()

  if (isActive) {
    return (
      <TestCurrentDataStyled>
        <BoxSpan>
          <span>Products: {products.length}</span>
          <span>
            Search: {stringToSearch === "" ? "-Empty-" : stringToSearch}
          </span>
          <span>CurrentPage: {state.currentPage}</span>
        </BoxSpan>
        <button onClick={handleClick}>X</button>
      </TestCurrentDataStyled>
    );
  }

  return null;
};

export default TestCurrentData;
