import styled, { css, keyframes } from "styled-components";

interface SpinLoaderProps {
  color?: string;
  size?: string;
}

const rotateLoader = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinLoaderStyled = styled.span<SpinLoaderProps>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid ${({ color }) => (color ? color : "#fff")};
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: ${rotateLoader} 1s linear infinite;
  position: absolute;
  right: -49px;

  ${({ size }) =>
    size
      ? css`
          width: ${size}px;
          height: ${size}px;
          border-top: 6px solid #3c3c3c;
          border-right: 6px solid transparent;
        `
      : css`
          width: 65px;
          height: 65px;
          border-top: 6px solid #3c3c3c;
          border-right: 6px solid transparent;
        `}

  ${({ color }) =>
    color
      ? css`
          border-top: 6px solid ${color};
        `
      : css`
          border-top: 6px solid #3c3c3c;
        `}
`;

export const SpinLoaderParentStyled = styled.div`
  width: 100%;
  height: 10rem;
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SpinLoader = ({ color, size }: SpinLoaderProps) => {
  return <SpinLoaderStyled color={color} size={size}></SpinLoaderStyled>;
};

export default SpinLoader;
