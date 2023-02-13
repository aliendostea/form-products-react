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
