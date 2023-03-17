import styled, { css } from "styled-components/macro";
import { device } from "./deviceMediaQuerys.styled";

export const gridTemplateColumns1 = css`
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      10,
      [col-start] minmax(5rem, 13rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];

  ${device.betweenPcAndTabPort2} {
    grid-template-columns:
      [full-start] minmax(6rem, 1fr) [center-start] repeat(
        10,
        [col-start] minmax(min-content, 13rem) [col-end]
      )
      [center-end] minmax(6rem, 1fr) [full-end];
  }

  ${device.tabPort} {
    grid-template-columns:
      [full-start] minmax(2rem, 1fr) [center-start] repeat(
        4,
        [col-start] minmax(min-content, 20rem) [col-end]
      )
      [center-end] minmax(2rem, 1fr) [full-end];
  }

  ${device.phone} {
    grid-template-columns:
      [full-start] minmax(2rem, 1fr) [center-start] repeat(
        4,
        [col-start] minmax(4rem, 14rem) [col-end]
      )
      [center-end] minmax(2rem, 1fr) [full-end];
  }
`;

export const BoxContainer = styled.div`
  grid-column: center-start / center-end;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: minmax(10rem, 1fr); */
  justify-items: center;
  align-self: start;
  align-items: start;
`;

interface ContainerProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
}

export const ContainerGrid = styled.div<ContainerProps>`
  display: grid;
  grid-template-areas:
    "sidebar boxHeader boxHeader"
    "sidebar boxContent boxContent";
  /*  grid-template-rows: 8rem minmax(62rem, calc(100vh - 8rem));
  -ms-grid-rows: 8rem minmax(62rem, calc(100dvh - 8rem));
  grid-template-rows: 8rem minmax(62rem, calc(100dvh - 8rem)); */
  grid-template-rows: 8rem minmax(62rem, 1fr);
  column-gap: 2rem;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.isSidebarOpen
      ? "grid-template-columns: 23rem 1fr;"
      : "grid-template-columns: 13rem 1fr;"};

  ${device.betweenPcAndTabPort} {
    column-gap: 1rem;
  }

  ${device.tabPort} {
    grid-template-areas:
      "boxHeader boxHeader"
      "boxContent boxContent";
  }
`;

export const BoxContent = styled.div`
  grid-area: boxContent;
  display: grid;
  z-index: 5;
  transition: all 0.2s ease-in-out;
`;

export const PagesCardBaseStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  font-size: 3rem;
  padding: 1rem 2rem 1rem 0;

  ${device.betweenPcAndTabPort2} {
    padding: 1rem 1rem 1rem 0;
  }

  ${device.tabPort} {
    padding: 1rem;
  }
`;
