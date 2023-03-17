import { device } from "@/styles";
import styled, { css } from "styled-components";

interface SideBarIconProps {
  isActive: boolean;
  isSidebarOnLeft: boolean;
}

interface SidebarStyledProps {
  isActive: boolean;
}

interface SidebarHorizBtnProps {
  isActive: boolean;
}

interface SideBarProps {
  isActive: boolean;
}

export const SidebarStyled = styled.div<SidebarStyledProps>`
  grid-area: sidebar;
  display: grid;
  grid-template-rows: 8rem min-content;
  gap: 3rem;
  background-color: rgb(230, 230, 230);
  transition: all 0.2s ease-in-out;
  z-index: 1;

  ${device.tabPort} {
    height: 100%;
    background-color: transparent;
    isolation: revert;
    transform: translateX(-131px);
    position: fixed;
    z-index: 999;

    ${({ isActive }) =>
      isActive
        ? css`
            transform: translateX(0);
          `
        : css`
            transform: translateX(-131px);
          `};

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      display: inline-block;
      background-color: rgb(243, 243, 243);
      box-shadow: 9px 0 21px rgba(0, 0, 0, 0.251);
      transition: all 0.2s ease-in-out;
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
    }
  }
`;

export const LogoStyled = styled.figure`
  width: clamp(5rem, 100% - 5rem, 9.3rem);
  display: inline-block;
  justify-self: center;

  ${device.phone} {
    width: 7rem;
    justify-self: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const SidebarUl = styled.ul`
  display: grid;
  grid-template-rows: repeat(2, 4.2rem);
`;

export const SidebarLi = styled.li`
  display: grid;
  justify-content: stretch;
  align-content: stretch;
`;

export const SidebarHorizBtn = styled.button<SidebarHorizBtnProps>`
  display: flex;
  align-content: center;
  align-items: center;
  padding-left: 20px;
  font-size: 1.6rem;
  font-weight: 408;
  letter-spacing: 0.036em;
  text-align: left;
  position: relative;
  transition: all 0.2s ease-in-out;

  ${({ isActive }) =>
    isActive
      ? css`
          font-weight: 600;
          color: var(--color-primary);
        `
      : css`
          font-weight: 400;
          color: #6e6e6e;
        `};

  &:hover {
    background: #e0e0e0;
  }

  &::after {
    content: "";
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    ${({ isActive }) =>
      isActive
        ? "background-color: var(--color-primary);"
        : "background-color: #d1d1d1;"};
  }
`;

export const SideBarIcon = styled.figure<SideBarIconProps>`
  width: 2.1rem;
  display: inline-block;
  margin-right: 10px;
  margin-top: 7px;
  filter: sepia(10%);
  transition: all 0.2s ease-in-out;

  @media only screen and (min-width: 900px) and (max-width: 2000px) {
    ${({ isSidebarOnLeft }) =>
      isSidebarOnLeft
        ? css`
            transform: translateX(0) scale(1);
          `
        : css`
            transform: translateX(28px) scale(1.2);
            margin-right: 0;
          `};
  }

  ${device.tabPort} {
    transform: translateX(28px) scale(1.2);
    margin-right: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.2s ease-in-out;

    ${({ isActive }) =>
      isActive ? "filter: grayscale(0%);" : "filter: grayscale(91%);"};
  }
`;

export const SideBarIconCable = styled(SideBarIcon)`
  width: 2.3rem;

  @media only screen and (min-width: 900px) and (max-width: 2000px) {
    ${({ isSidebarOnLeft }) =>
      isSidebarOnLeft
        ? css`
            transform: translate(0, -10px) scale(1) rotate(180deg);
          `
        : css`
            transform: translate(29px, -10px) scale(1.2) rotate(180deg);
            margin-right: 0;
          `};
  }

  ${device.tabPort} {
    transform: translate(29px, -10px) scale(1.2) rotate(180deg);
    margin-right: 0;
  }
`;

export const SideBarTitleSpan = styled.span<SideBarProps>`
  display: inline-block;
  transition: all 0.1s ease-in-out;

  ${device.tabPort} {
    opacity: 0;
    visibility: hidden;
  }

  @media only screen and (min-width: 900px) and (max-width: 2000px) {
    ${({ isActive }) =>
      isActive
        ? css`
            opacity: 1;
            visibility: visible;
          `
        : css`
            opacity: 0;
            visibility: hidden;
          `};
  }
`;

export const SideBarSpanBgOnPhone = styled.span<SideBarProps>`
  width: 120vw;
  height: 100%;
  display: none;
  background-color: hsla(0, 0%, 0%, 0.478);
  backdrop-filter: blur(11px);
  position: absolute;
  top: 0;
  left: 131px;
  z-index: -2;
  transform: translateX(24px);

  ${device.tabPort} {
    display: inline-block;
  }

  ${({ isActive }) =>
    isActive
      ? css`
          opacity: 1;
          visibility: visible;
          transform: translateX(-24px);
        `
      : css`
          transform: translateX(24px);
          opacity: 0;
          visibility: hidden;
        `};
`;
