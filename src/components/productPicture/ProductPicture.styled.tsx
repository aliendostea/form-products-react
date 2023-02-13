import styled from "styled-components";

export const ProductPictureFigure = styled.figure`
  width: 9rem;
  height: 9rem;
  display: inline-block;
  overflow: hidden;
  border-radius: 6px;
  aspect-ratio: 1 / 1;
  border: 2px solid #e0e0e0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
