import styled, { css } from "styled-components";

interface SideBarIconProps {
  isActive: boolean;
  isSidebarOnLeft: boolean;
}

interface SidebarHorizBtnProps {
  isActive: boolean;
}

interface SideBarProps {
  isActive: boolean;
}

export const SidebarStyled = styled.div`
  grid-area: sidebar;
  display: grid;
  grid-template-rows: 8rem min-content;
  gap: 3rem;
  background-color: rgb(230, 230, 230);
  transition: all 0.2s ease-in-out;
  z-index: 1;
`;

export const LogoStyled = styled.figure`
  width: 9rem;
  width: clamp(5rem, 100% - 5rem, 9.3rem);
  display: inline-block;
  justify-self: center;

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
        : "background-color: transparent;"};
  }
`;

export const SideBarIcon = styled.figure<SideBarIconProps>`
  width: 2.1rem;
  display: inline-block;
  margin-right: 10px;
  margin-top: 7px;
  filter: sepia(10%);
  transition: all 0.2s ease-in-out;

  ${({ isSidebarOnLeft }) =>
    isSidebarOnLeft
      ? css`
          transform: translateX(0) scale(1);
        `
      : css`
          transform: translateX(28px) scale(1.2);
          margin-right: 0;
        `};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.2s ease-in-out;

    ${({ isActive }) =>
      isActive ? "filter: grayscale(0%);" : "filter: grayscale(91%);"};
  }
`;

export const SideBarTitleSpan = styled.span<SideBarProps>`
  display: inline-block;
  transition: all 0.1s ease-in-out;
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
`;

/// width: 2.8rem;

///  padding-left: 0;
///  justify-content: center;
