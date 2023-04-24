import { CardStyled } from "./card.styled";

interface CardProps {
  children: JSX.Element;
  size?: string;
  theme?: string;
}
const Card = ({ children, size }: CardProps) => {
  return <CardStyled size={size}>{children}</CardStyled>;
};

export default Card;
