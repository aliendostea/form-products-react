import styled from "styled-components";
import { SpinLoader } from "../spinLoader";
import { GlobalStyles } from "@/styles";

export const ParentLoader = styled.div`
  display: grid;
  grid-template-rows: 21rem repeat(2, 10rem) minmax(20rem, calc(100vh - 31rem));
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-color: var(--color-primary);

  & > span:nth-child(2) {
    grid-row: 3 / 4;
    right: 0;
    position: initial;
    justify-self: center;
    margin: 8rem 0 2rem 0;
  }
`;

export const LogoInitLoader = styled.figure`
  grid-row: 2 / 3;
  width: 10rem;
  display: grid;
  justify-self: center;

  & > img {
    filter: brightness(10);
    opacity: 0.9;
  }
`;

const FallbackAppOnLoad = () => {
  return (
    <ParentLoader>
      <LogoInitLoader>
        <img src="./img/zentec-logo.svg" alt="Zentec" loading="lazy" />
      </LogoInitLoader>
      <SpinLoader color="rgba(255, 255, 255, 0.6)" size="45" />
      <GlobalStyles />
    </ParentLoader>
  );
};

export default FallbackAppOnLoad;
