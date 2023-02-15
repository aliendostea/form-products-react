import { useStore } from "@/store/store";
import { useReducer } from "react";
import {
  SidebarStyled,
  LogoStyled,
  SidebarUl,
  SidebarLi,
  SidebarHorizBtn,
  SideBarIcon,
  SideBarTitleSpan,
} from "./sidebar.styled";

interface ArgSidebarButtonOnclick {
  BUTTON_1: boolean;
  BUTTON_2: boolean;
}

enum SidebarButtonOnclickActionKind {
  BUTTON_1 = "BUTTON_1",
  BUTTON_2 = "BUTTON_2",
}

interface SidebarButtonOnclick {
  type: SidebarButtonOnclickActionKind;
  payload: boolean;
}

const initialArgSidebarButtonOnclick: ArgSidebarButtonOnclick = {
  BUTTON_1: true,
  BUTTON_2: false,
};

function sidebarButtonOnclick(
  state: ArgSidebarButtonOnclick,
  action: SidebarButtonOnclick
) {
  return {
    BUTTON_1: !state["BUTTON_1"],
    BUTTON_2: !state["BUTTON_2"],
  };
}

const Sidebar = () => {
  const [globalState] = useStore();
  const [stateButtons, dispatch] = useReducer(
    sidebarButtonOnclick,
    initialArgSidebarButtonOnclick
  );

  const handleOnClick = () => {
    dispatch({
      type: SidebarButtonOnclickActionKind.BUTTON_1,
      payload: false,
    });
  };

  /*  const handleOnClick2 = () => {
    dispatch({
      type: SidebarButtonOnclickActionKind.BUTTON_2,
      payload: false,
    });
  }; */

  return (
    <SidebarStyled>
      <LogoStyled>
        <img src="./img/zentec-logo.svg" alt="Zentec" loading="lazy" />
      </LogoStyled>

      <SidebarUl>
        <SidebarLi>
          <SidebarHorizBtn
            onClick={handleOnClick}
            isActive={stateButtons.BUTTON_1}
            type="button"
          >
            <SideBarIcon
              isActive={stateButtons.BUTTON_1}
              isSidebarOnLeft={globalState.isSidebarOpen}
            >
              <img src="./img/icon-cart.png" alt="Zentec" loading="lazy" />
            </SideBarIcon>
            <SideBarTitleSpan isActive={globalState.isSidebarOpen}>
              Bombillos
            </SideBarTitleSpan>
          </SidebarHorizBtn>
        </SidebarLi>
        {/*   <SidebarLi>
          <SidebarHorizBtn
            onClick={handleOnClick2}
            isActive={stateButtons.BUTTON_2}
            type="button"
          >
            <SideBarIcon
              isActive={stateButtons.BUTTON_2}
              isSidebarOnLeft={globalState.isSidebarOpen}
            >
              <img src="./img/icon-cart.png" alt="Zentec" loading="lazy" />
            </SideBarIcon>
            <SideBarTitleSpan isActive={globalState.isSidebarOpen}>
              cables
            </SideBarTitleSpan>
          </SidebarHorizBtn>
        </SidebarLi>
        <SidebarLi>
          <SidebarHorizBtn
            onClick={handleOnClick2}
            isActive={stateButtons.BUTTON_2}
            type="button"
          >
            <SideBarIcon
              isActive={stateButtons.BUTTON_2}
              isSidebarOnLeft={globalState.isSidebarOpen}
            >
              <img src="./img/icon-cart.png" alt="Zentec" loading="lazy" />
            </SideBarIcon>
            <SideBarTitleSpan isActive={globalState.isSidebarOpen}>
              Eliminados
            </SideBarTitleSpan>
          </SidebarHorizBtn>
        </SidebarLi> */}
      </SidebarUl>
    </SidebarStyled>
  );
};

export default Sidebar;
