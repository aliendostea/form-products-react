import styled from "styled-components";

export const ButtonStyles = styled.button`
  &,
  &:link,
  &:visited {
    width: 17rem;
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 25px 10px;
    border: none;
    border-radius: 20px;
    background-color: var(--color-primary);
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    justify-self: center;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px);
    }

    &:focus {
      outline: none;
    }
  }
`;

interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  const handleOnClick = () => {};
  return (
    <ButtonStyles onClick={handleOnClick} type="submit">
      {label}
    </ButtonStyles>
  );
};

export default Button;
