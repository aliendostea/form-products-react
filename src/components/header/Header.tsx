import { HeaderStyled, LogoStyled } from "./header.styled";

const Header = () => {
  return (
    <HeaderStyled>
      <LogoStyled>
        <img src={"./img/zentec-logo.svg"} alt="Zentec" loading="lazy" />
      </LogoStyled>
    </HeaderStyled>
  );
};

export default Header;
