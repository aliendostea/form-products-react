import { device } from "@/styles";
import styled from "styled-components";

export const ResponsiveStyle = styled.div`
  width: 24rem;
  grid-template-columns: repeat(2, min-content);
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.8rem;
  border-radius: 10px;
  background-color: rgb(130, 172, 172);
  position: fixed;
  top: 10px;
  left: 150px;
  z-index: 1000;

  ${device.tabBetweenLandAndDesktop} {
    background-color: rgb(216, 99, 31);
    color: rgb(18, 34, 4);
  }
  ${device.tabLand} {
    background-color: rgb(33, 77, 172);
    color: rgb(219, 214, 250);
  }
  ${device.betweenPcAndTabPort} {
    background-color: rgb(172, 33, 110);
    color: rgb(10, 65, 35);
  }
  ${device.betweenPcAndTabPort2} {
    background-color: rgb(152, 33, 110);
    color: rgb(10, 65, 35);
  }
  ${device.tabPort} {
    background-color: rgb(172, 135, 33);
    color: rgb(65, 43, 10);
    top: 115px;
    left: 205px;
  }
  ${device.phone} {
    background-color: rgb(43, 49, 49);
    color: rgb(255, 169, 169);
    top: 13px;
    left: 118px;
  }
  ${device.miniPhone} {
    background-color: rgb(50, 206, 206);
    color: rgb(167, 67, 67);
  }
  ${device.bigDesktop} {
    background-color: rgb(95, 160, 52);
    color: rgb(18, 34, 4);
  }

  & button {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-ligth);
    border: 3px solid aliceblue;
    border-radius: 50%;
    background-color: transparent;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 16px 8px;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    position: absolute;
    top: 8px;
    right: 14px;
    z-index: 10;
  }
`;
