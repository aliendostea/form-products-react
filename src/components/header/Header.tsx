import React from "react";
import { useFilters } from "@/hooks/use-filters";
import { useLayout } from "@/hooks/use-layout";
import { SearchBar } from "../textFieldSearch";
import {
  BtnSidebarOpenClose,
  HeaderLinesOptions,
  HeaderStyled,
  HeaderUserAvatar,
  LogoSidebarStyled,
} from "./header.styled";

const Header = () => {
  const { state, toggleSidebar } = useLayout();
  const { setFilters } = useFilters();
  /*  const inputRef = useRef<HTMLDivElement | null>(null); */
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleOnClick = () => {
    toggleSidebar();
  };

  //// React.ChangeEvent<HTMLInputElement>
  const handleOnChangeSearch = () => {
    setFilters({
      stringToSearch: inputRef?.current?.value ?? "",
      isFilteringOnKeydown: true,
    });
  };

  const handleOnClickEmptySearchInput = () => {
    setFilters({
      stringToSearch: "",
      isFilteringOnKeydown: false,
    });
  };

  const handleOnClickSidebarOnPhone = () => {
    toggleSidebar();
  };

  return (
    <HeaderStyled>
      <LogoSidebarStyled>
        <img src="./img/zentec-logo.svg" alt="Zentec" loading="lazy" />
      </LogoSidebarStyled>

      <BtnSidebarOpenClose
        isActive={state.isSidebarOpen}
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
        ref={inputRef}
        name="searchInput"
        placeholder="Search product"
        onChange={handleOnChangeSearch}
        handleOnClickEmptyInput={handleOnClickEmptySearchInput}
      />

      <HeaderUserAvatar>
        <figure>
          <img src="./img/icon-user.png" alt="User" loading="lazy" />
        </figure>
      </HeaderUserAvatar>

      <HeaderLinesOptions onClick={handleOnClickSidebarOnPhone}>
        <span></span>
      </HeaderLinesOptions>
    </HeaderStyled>
  );
};

export default Header;
