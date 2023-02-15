import styled, { css } from "styled-components";
import { createTheme } from "@mui/material";

export const themeDataTable = createTheme({
  typography: {
    fontSize: 21,
  },
});

export const TableParentStyled = styled.div`
  grid-column: 1/-1;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(10rem, 1fr);
  background-color: #f6f6f6;
  border-radius: 15px;
  box-shadow: 0 16px 15px hsla(0, 0%, 0%, 0.02);
  padding: 1rem 2rem;
`;

interface SpanCellAvailableProps {
  isAvailable: boolean;
}

export const SpanCellAvailable = styled.span<SpanCellAvailableProps>`
  display: block;
  color: var(--color-green);

  ${({ isAvailable }) =>
    isAvailable
      ? css`
          color: var(--color-green);
          filter: brightness(70%);
        `
      : css`
          color: var(--color-red);
          filter: brightness(70%);
        `};
`;

export const TableEmptyCells = styled.div`
  width: 10rem;
  height: 12rem;
  display: grid;
  position: relative;
`;

export const TableEmptyItemCells = styled.span`
  display: grid;
  grid-template-columns: min-content min-content;
  gap: 1rem;
  align-items: center;
  font-size: 2.2rem;
  color: #bdbdbd;
  white-space: nowrap;
  position: absolute;
  top: 39px;
  right: -175px;

  & > figure:nth-child(1) {
    display: inline-block;
    width: 3rem;
  }
`;
