import styled from "styled-components";

export const CardStyled = styled.div`
  justify-self: center;
  grid-column: 1 / 3;
  min-height: 135px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 4rem 3rem 4rem 3rem;
  border-radius: 22px;
  transition: 0.25s ease-in-out;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 20px 57px hsla(0, 0%, 0%, 0.18);
`;

interface CardProps {
  children: JSX.Element;
  theme?: string;
}
const Card = ({ children }: CardProps) => {
  return <CardStyled>{children}</CardStyled>;
};

export default Card;
