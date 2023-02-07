import styled, { css } from "styled-components";

interface BtnSidebarOpenCloseProps {
  isActive: boolean;
}

export const HeaderStyled = styled.div`
  grid-area: boxHeader;
  display: grid;
  grid-template-columns: 5rem 7rem;
  justify-content: space-between;
  padding: 0 2rem;
  border-radius: 15px;
  background-color: #e6e6e6;
  transition: all 0.2s ease-in-out;
  z-index: 5;
`;

export const HeaderUserAvatar = styled.button`
  width: 4rem;
  height: 4rem;
  justify-self: end;
  align-self: center;
  background-color: #d1d1d1;
  border-radius: 50%;
  overflow: hidden;

  & > figure:nth-child(1) {
    width: 4rem;
    display: block;
    transform: translateY(6px) scale(0.81);
    opacity: 0.3;
  }
`;

export const BtnSidebarOpenClose = styled.button<BtnSidebarOpenCloseProps>`
  width: 4rem;
  height: 4rem;
  display: grid;
  justify-content: center;
  align-items: center;
  justify-self: start;
  align-self: center;
  border-radius: 50%;
  transition: all 0.4s ease-in-out;
  transform: rotate(90deg);

  ${({ isActive }) =>
    isActive
      ? css`
          transform: rotate(90deg);
        `
      : css`
          transform: rotate(-90deg);
        `};

  &:hover {
    background-color: #c8c8c8;
  }

  & > figure:nth-child(1) {
    display: flex;
    width: 1.8rem;
    opacity: 0.3;
    transition: all 0.2s ease-in-out;
  }
`;
