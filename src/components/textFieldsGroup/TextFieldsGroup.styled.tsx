import styled from "styled-components";

export const LineInputsInternalCode = styled.div`
  grid-column: 1 / -1;
  width: 112px;
  height: 1px;
  display: inline-block;
  justify-self: center;
  background-color: hsla(0, 0%, 0%, 0.11);
  margin-top: 10px;
`;

export const BoxBtnRemoveItems = styled.div`
  grid-column: 1 / -1;
  display: grid;
  justify-content: end;
  position: relative;

  & > button {
    width: 2.5rem;
    display: grid;
    grid-template-columns: 2.5rem;
    justify-content: center;
    align-items: center;
    justify-self: center;
    gap: 5px;
    transition: 0.45s ease-in-out;
    opacity: 1;
  }

  & > button figure {
    width: 2.2rem;
    height: 2.2rem;
    align-self: center;
    display: block;

    & > img {
      filter: grayscale(98%);
      opacity: 0.3;
      transition: 0.45s ease-in-out;
    }
  }

  & > button:hover + span {
    opacity: 1;
  }
  & > button:hover img {
    filter: grayscale(0%);
    opacity: 1;
  }
  &:hover > button {
    opacity: 1;
  }
`;

export const SpanBgBtnRemoveItems = styled.span`
  height: 25rem;
  width: calc(100% + 10px);
  display: block;
  background: #f4f4f4;
  border-radius: 7px;
  opacity: 0;
  position: absolute;
  bottom: -222px;
  left: -6px;
  transition: 0.45s ease-in-out;
  z-index: -1;
`;
