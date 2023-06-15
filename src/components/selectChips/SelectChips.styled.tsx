import styled, { keyframes } from "styled-components";
import { BtnClose } from "../modal/Modal.style";

const animationStart = keyframes`
    0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
      opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
      opacity: 1;
  }
`;

interface SelectBoxStyledProps {
  isError: string | boolean | undefined;
}

export const SelectBoxStyled = styled.div<SelectBoxStyledProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(4rem, 7rem));
  grid-template-rows: repeat(2, min-content);
  gap: 3px 2px;
  padding: 2px 3px;
  border: 2px solid #e0e0e0;
  border-radius: 4.5px;
  background-color: #fff;
  overflow-x: hidden;
  transition: all 0.3s ease-in-out;

  ${({ isError }) =>
    isError
      ? "border: 2px solid var(--color-red);"
      : "border: 2px solid #e0e0e0;"};
`;

export const SelectChip = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  text-align: center;
  padding: 5px 7px;
  background-color: #fff1de;
  border-radius: 15px;
  transition: all 0.7s ease-in-out;

  &:hover {
    background-color: #eeddc6;
    box-shadow: 0 6px 9px hsla(0, 0%, 0%, 0.11);
    transform: translateY(-1px);
  }

  & > span:nth-child(1) {
    font-size: 1.1rem;
    font-weight: 631;
    text-transform: uppercase;
    line-height: 0.9;
    margin-right: 5px;
  }

  & > span:nth-child(2) {
    width: 1.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const SelectChipAddItemStyled = styled(SelectChip)`
  background-color: #efefef;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    background-color: #e4e4e4;
  }

  & > span:nth-child(2) {
    font-size: 1.1rem;
    font-weight: 631;
    text-transform: uppercase;
    line-height: 0.9;
    margin-left: 5px;

    &:hover {
      transform: translateY(0);
    }
  }

  & > span:nth-child(1) {
    width: 1.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(135deg);
    transition: all 0.3s ease-in-out;
  }
`;

export const BoxStyled = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: min-content 6rem 1rem;
  position: relative;
`;

interface LabelStyledProps {
  touched?: boolean | undefined;
}
export const TitleStyled = styled.span<LabelStyledProps>`
  display: block;
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  &--error {
    color: #c12626;
  }
`;

export const SpanErrorStyled = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  color: #c12626;
  margin-top: 2px;
`;

export const BoxAddNewChipStyled = styled.form`
  width: 27rem;
  height: 11rem;
  display: grid;
  grid-template-columns: 1fr 6rem;
  gap: 10px;
  align-items: center;
  padding: 1rem 3rem 1rem 1rem;
  border-radius: var(--border-radius-1);
  box-shadow: 1px 9px 15px rgba(0, 0, 0, 0.259);
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 50%;
  bottom: 145px;
  transform: translate(-5%, -5%);
  -webkit-animation: ${animationStart} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: ${animationStart} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  z-index: 100;

  & > div + button {
    width: 100%;
    height: 5.8rem;
    align-self: center;
    margin-top: 11px;
  }
`;

export const BtnCloseSelectChips = styled(BtnClose)`
  top: 5px;
  right: 7px;
  position: absolute;

  & > svg {
    fill: #b7b7b7;
  }
`;
