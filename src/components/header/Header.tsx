import { useState } from "react";
import { useStore } from "@/store/store";
import { LogoStyled } from "../sidebar/sidebar.styled";
import {
  BtnSidebarOpenClose,
  HeaderStyled,
  HeaderUserAvatar,
} from "./header.styled";
import SearchBar from "../textFieldSearch/TextFieldSearch";
import { useFilterProduct } from "@/hooks/use-filter-product";

const Header = () => {
  const [globalState, dispatch] = useStore();
  const [searchInput, setSearchInput] = useState("");
  const [, setDataToFilter] = useFilterProduct();

  const handleOnClick = () => {
    dispatch("TOGGLE_SIDEBAR", {});
  };

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setDataToFilter(e.target.value);
  };

  const handleOnClickEmptySearchInput = () => {
    setSearchInput("");
    setDataToFilter("");
  };

  return (
    <HeaderStyled>
      <LogoStyled>
        <img src="./img/zentec-logo.svg" alt="Zentec" loading="lazy" />
      </LogoStyled>
      <BtnSidebarOpenClose
        isActive={globalState.isSidebarOpen}
        onClick={handleOnClick}
      >
        <figure>
          <img
            src="./img/icon-arrow-sidebar.png"
            alt="Sidebar"
            loading="lazy"
          />
        </figure>
      </BtnSidebarOpenClose>

      <SearchBar
        name="searchInput"
        value={searchInput}
        placeholder="Search product"
        onChange={handleOnChangeSearch}
        handleOnClickEmptyInput={handleOnClickEmptySearchInput}
      />

      <HeaderUserAvatar>
        <figure>
          <img src="./img/icon-user.png" alt="User" loading="lazy" />
        </figure>
      </HeaderUserAvatar>
    </HeaderStyled>
  );
};

export default Header;
