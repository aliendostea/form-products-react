import styled from "styled-components";
import { device } from "@/styles";

/* interface CardStyledProps {
  error: boolean | undefined;
} */

export const CardStyled = styled.div`
  justify-self: center;
  grid-column: 1 / 3;
  min-height: 135px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.8rem 3rem 1.8rem 3rem;
  border-radius: 22px;
  transition: 0.25s ease-in-out;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 20px 57px hsla(0, 0%, 0%, 0.18);

  ${device.phone} {
    grid-template-rows: min-content minmax(22rem, 80vh);
    padding: 1.8rem 2rem 1.8rem 2rem;
  }
  ${device.miniPhone} {
    grid-template-columns: minmax(10rem, 31rem);
    padding: 1.2rem 1.8rem 1.2rem 1.8rem;
  }
`;

interface CardProps {
  children: JSX.Element;
  theme?: string;
}
const Card = ({ children }: CardProps) => {
  return <CardStyled>{children}</CardStyled>;
};

export default Card;
