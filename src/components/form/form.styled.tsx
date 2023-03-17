import styled, { css } from "styled-components";
import { device } from "@/styles";

export const AddNewProduct = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: end;
  margin-bottom: 8px;
`;

export const AddNewProductBtn = styled.button`
  height: 5rem;
  width: 16rem;
  display: grid;
  grid-template-columns: 3rem 1fr;
  justify-items: center;
  align-content: center;
  padding: 0 14px;
  background-color: #f6f6f6;
  border-radius: 11px;
  transition: 0.3s ease-in-out;

  & > svg {
    width: 46px;
    height: 27px;
    fill: var(--color-primary);
    align-self: center;
  }

  & span {
    font-size: 1.5rem;
    font-weight: 568;
    color: var(--color-primary);
  }

  &:hover {
    transform: translateY(-3px);
  }
`;

export const FormStyled = styled.form`
  max-height: 60rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.4rem 1rem;
  padding: 10px 0;
  overflow: hidden;

  ${device.tabPort} {
    overflow-y: scroll;
  }

  ${device.phone} {
    max-height: initial;
    width: 30rem;
    grid-template-columns: 1fr;
  }

  ${device.miniPhone} {
    width: 100%;
  }

  & > button {
    grid-column: 1 / -1;
  }
`;

export const FormBoxImgs = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 12.5rem;
  justify-content: center;

  ${device.phone} {
    grid-template-columns: 1fr;
    justify-self: center;
  }
`;

export const baseImageFormSize = "12.5rem";

const baseImageForm = css`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: ${baseImageFormSize};
  height: ${baseImageFormSize};
  display: grid;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 6px;
  aspect-ratio: 1 / 1;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  z-index: 5;

  &:hover {
    outline: none;
    border: 2px solid var(--color-primary);
    box-shadow: 0 12px 20px #cecece;
    transform: translateY(-4px);
  }

  & img {
    width: 3rem;
  }
`;

export const ImageFormSelected = styled.figure`
  ${baseImageForm}
  & img {
    width: 100%;
  }
`;

interface ImageFormEmptyProps {
  error: boolean;
}

export const ImageFormEmpty = styled.figure<ImageFormEmptyProps>`
  ${baseImageForm}

  ${({ error }) =>
    error
      ? "border: 2px solid var(--color-red);"
      : "border: 2px solid var(--color-primary);"};
`;

export const SwitchBoxStyled = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;

  ${device.phone} {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
`;
