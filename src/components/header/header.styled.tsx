import styled from "styled-components";

export const HeaderStyled = styled.div`
  grid-column: full-start / full-end;
  display: grid;
  font-size: 3rem;
  background-color: #fff;
  box-shadow: 0 12px 21px rgba(0, 0, 0, 0.059);
  justify-content: center;
`;

export const LogoStyled = styled.figure`
  width: 9rem;
  display: inline-block;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
