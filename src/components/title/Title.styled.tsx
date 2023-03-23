import { device, fontFamily1 } from "@/styles";
import styled from "styled-components";

export const TitleStyled = styled.span`
  display: block;
  font-family: ${fontFamily1};
  font-weight: 653;
  font-size: 2.2rem;
  line-height: 1.2;
  letter-spacing: 0.37px;

  ${device.phone} {
    line-height: 1;
  }
`;

export const TitleStyled2 = styled.span`
  display: block;
  font-family: ${fontFamily1};
  font-weight: 600;
  font-size: 3.2rem;
  line-height: 1.2;
  letter-spacing: 0.37px;
  text-align: center;

  ${device.phone} {
    line-height: 1;
  }
`;
