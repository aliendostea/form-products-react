import { device } from "@/styles";
import styled, { css } from "styled-components";
import { LogoStyled } from "../sidebar/sidebar.styled";

interface BtnSidebarOpenCloseProps {
  isActive: boolean;
}

export const LogoSidebarStyled = styled(LogoStyled)`
  display: none;

  ${device.tabPort} {
    display: flex;
    justify-self: start;
  }
`;

export const HeaderStyled = styled.div`
  grid-area: boxHeader;
  display: grid;
  grid-template-columns: 5rem 0.81fr 7rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-radius: 15px;
  background-color: #e6e6e6;
  transition: all 0.2s ease-in-out;
  z-index: 5;

  ${device.tabPort} {
    grid-template-columns: 12rem 1fr 5rem min-content;
    gap: 10px;
  }

  ${device.phone} {
    grid-template-columns: 7rem 0.81fr 5rem min-content;
    gap: 3px;
    padding: 0 1rem;
  }

  ${device.miniPhone} {
    grid-template-columns: 7rem 0.81fr 5rem min-content;
  }
`;

export const HeaderUserAvatar = styled.button`
  width: 4rem;
  height: 4rem;
  justify-self: end;
  align-self: center;
  background-color: #d1d1d1;
  border-radius: 50%;
  overflow: hidden;

  ${device.tabPort} {
    justify-self: center;
  }

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

  ${device.tabPort} {
    display: none;
  }
`;

export const HeaderLinesOptions = styled.button`
  display: none;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  background-color: #dcdcdc;

  ${device.tabPort} {
    display: grid;
    align-content: center;
    justify-content: center;
  }

  &:hover {
    filter: brightness(90%);
  }

  & span {
    width: 2rem;
    height: 3px;
    display: inline-block;
    background-color: var(--color-primary);
    border-radius: 9px;
    position: relative;
    transition: all 0.2s ease-in-out;

    &::before,
    &::after {
      content: "";
      width: 2rem;
      height: 3px;
      display: inline-block;
      background-color: var(--color-primary);
      border-radius: 9px;
      transition: all 0.2s ease-in-out;
      position: absolute;
      top: 6px;
      right: 0;
    }

    &::after {
      top: -6px;
    }
  }

  &:hover span::before {
    transform: translateY(-1px);
  }
  &:hover span::after {
    transform: translateY(1px);
  }
`;
