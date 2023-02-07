import styled, { css, keyframes } from "styled-components";

interface ButtonLoaderProps {
  isLoading?: boolean;
}

export const ButtonStyles = styled.button<ButtonLoaderProps>`
  &,
  &:link,
  &:visited {
    width: 17rem;
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: white;
    padding: 25px 10px;
    border: none;
    border-radius: 11px;
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

    ${({ isLoading }) =>
      isLoading
        ? css`
            padding: 19px 10px;
            filter: brightness(92%);
            cursor: not-allowed;

            &:hover {
              transform: translateY(0);
            }
          `
        : css``};
  }
`;

const rotateLoader = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ButtonLoader = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #fff;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: ${rotateLoader} 1s linear infinite;
`;

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  btnLoader?: boolean;
  handleOnClick?: () => void;
}

const Button = ({
  label,
  disabled = false,
  btnLoader,
  handleOnClick,
}: ButtonProps) => {
  return (
    <ButtonStyles
      onClick={handleOnClick}
      type="submit"
      disabled={disabled}
      isLoading={btnLoader}
    >
      {label && label}
      {btnLoader && <ButtonLoader></ButtonLoader>}
    </ButtonStyles>
  );
};

export default Button;
