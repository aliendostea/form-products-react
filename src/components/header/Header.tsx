import { useStore } from "@/store/store";
import {
  BtnSidebarOpenClose,
  HeaderStyled,
  HeaderUserAvatar,
} from "./header.styled";

const Header = () => {
  const [globalState, dispatch] = useStore();

  const handleOnClick = () => {
    dispatch("TOGGLE_SIDEBAR", {});
  };
  return (
    <HeaderStyled>
      <BtnSidebarOpenClose
        isActive={globalState.isSidebarOpen}
        onClick={handleOnClick}
      >
        <figure>
          <img src="./img/icon-arrow-sidebar.png" alt="Sidebar" />
        </figure>
      </BtnSidebarOpenClose>
      <HeaderUserAvatar>
        <figure>
          <img src="./img/icon-user.png" alt="User" />
        </figure>
      </HeaderUserAvatar>
    </HeaderStyled>
  );
};

export default Header;
