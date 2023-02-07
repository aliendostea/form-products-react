import styled from "styled-components";
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

export const FigureStyled = styled.figure`
  width: 9rem;
  height: 9rem;
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
