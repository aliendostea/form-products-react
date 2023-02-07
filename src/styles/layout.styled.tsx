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

export const ContainerGrid = styled.div`
  display: grid;
  ${gridTemplateColumns1}
  grid-template-rows: 9rem minmax(55rem, 1fr);
  padding-bottom: 2rem;
  background-color: var(--color-primary);
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
