import styled from "styled-components";

const inputFontSize = "1.6rem";
const inputLetterSpacing = "0.2px";
const inputPlaceholderFontWeight = 600;
const color1 = "#c2c2c2";

interface SearchInputStyledProps {
  ref: React.ForwardedRef<any> | null;
}

export const SearchInputStyled = styled.input<SearchInputStyledProps>`
  width: 100%;
  height: 5.5rem;
  padding: 0 2.4rem;
  resize: none;
  font-size: ${inputFontSize};
  font-weight: 500;
  letter-spacing: ${inputLetterSpacing};
  color: gray;
  border-radius: 13.5px;
  border: 2px solid rgb(241, 241, 241);
  background-color: rgb(241, 241, 241);
  /* box-shadow: 0px 7px 19px #020f1c; */
  overflow-x: hidden;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus {
    border: 2px solid var(--color-primary);
  }

  &::-webkit-input-placeholder {
    color: ${color1};
    font-size: ${inputFontSize};
    font-weight: ${inputPlaceholderFontWeight};
    letter-spacing: ${inputLetterSpacing};
  }
  &::-moz-placeholder {
    color: ${color1};
    font-size: ${inputFontSize};
    font-weight: ${inputPlaceholderFontWeight};
    letter-spacing: ${inputLetterSpacing};
  }
  &:-ms-input-placeholder {
    color: ${color1};
    font-size: ${inputFontSize};
    font-weight: ${inputPlaceholderFontWeight};
    letter-spacing: ${inputLetterSpacing};
  }
  &::-ms-input-placeholder {
    color: ${color1};
    font-size: ${inputFontSize};
    font-weight: ${inputPlaceholderFontWeight};
    letter-spacing: ${inputLetterSpacing};
  }
  &::placeholder {
    color: ${color1};
    font-size: ${inputFontSize};
    font-weight: ${inputPlaceholderFontWeight};
    letter-spacing: ${inputLetterSpacing};
  }
`;

export const SearchBoxStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  position: relative;
`;

export const SearchBtnX = styled.span`
  width: 19px;
  height: 19px;
  display: block;
  border-radius: 24px;
  position: absolute;
  top: 33%;
  right: 18px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    width: 19px;
    height: 3px;
    display: block;
    background-color: #aeaeae;
    border-radius: 24px;
    transform: rotate(46deg);
    position: absolute;
    top: 7px;
    transition: all 0.2s ease-in-out;
  }

  &::before {
    transform: rotate(-46deg);
  }

  &:hover {
    transform: translateY(-2px);

    &::before,
    &::after {
      background-color: #7e7e7e;
    }
  }
`;
