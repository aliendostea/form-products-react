import { useReducer } from "react";
import { useLayout } from "@/hooks/use-layout";
import {
  SidebarStyled,
  LogoStyled,
  SidebarUl,
  SidebarLi,
  SidebarHorizBtn,
  SideBarIcon,
  SideBarTitleSpan,
  SideBarIconCable,
  SideBarSpanBgOnPhone,
} from "./sidebar.styled";
import { CURRENT_PAGE_VALUES } from "@/store/reducers/layoutReducers";

interface ArgSidebarButtonOnclick {
  LIGHT_BULBS: boolean;
  CABLES: boolean;
  MISCELLANEUS: boolean;
}

enum SidebarButtonOnclickActionKind {
  LIGHT_BULBS = "LIGHT_BULBS",
  CABLES = "CABLES",
  MISCELLANEUS = "MISCELLANEUS",
}

interface SidebarButtonOnclick {
  type: SidebarButtonOnclickActionKind;
  payload: boolean;
}

const initialArgSidebarButtonOnclick: ArgSidebarButtonOnclick = {
  LIGHT_BULBS: true,
  CABLES: false,
  MISCELLANEUS: false,
};

function sidebarButtonOnclick(
  state: ArgSidebarButtonOnclick,
  action: SidebarButtonOnclick
) {
  const newState = structuredClone(state);

  for (const property in newState) {
    newState[property as keyof typeof newState] = false;
  }

  return {
    ...newState,
    [action.type]: action.payload,
  };
}

const Sidebar = () => {
  const { state, setCurrentPage, toggleSidebar } = useLayout();
  const [stateButtons, dispatch] = useReducer(
    sidebarButtonOnclick,
    initialArgSidebarButtonOnclick
  );

  const handleOnClickBulbs = () => {
    if (state.currentPage === CURRENT_PAGE_VALUES.LIGHT_BULBS) return;

    dispatch({
      type: SidebarButtonOnclickActionKind.LIGHT_BULBS,
      payload: true,
    });
    setCurrentPage(CURRENT_PAGE_VALUES.LIGHT_BULBS);
  };

  const handleOnClickCables = () => {
    if (state.currentPage === CURRENT_PAGE_VALUES.CABLES) return;

    dispatch({
      type: SidebarButtonOnclickActionKind.CABLES,
      payload: true,
    });

    setCurrentPage(CURRENT_PAGE_VALUES.CABLES);
  };

  const handleOnClickOthers = () => {
    if (state.currentPage === CURRENT_PAGE_VALUES.MISCELLANEUS) return;

    dispatch({
      type: SidebarButtonOnclickActionKind.MISCELLANEUS,
      payload: true,
    });

    setCurrentPage(CURRENT_PAGE_VALUES.MISCELLANEUS);
  };

  const handleOnClickSidebarOnPhone = () => {
    toggleSidebar();
  };

  return (
    <SidebarStyled isActive={state.isSidebarOpen}>
      <LogoStyled>
        <img src="./img/zentec-logo.svg" alt="Zentec" loading="lazy" />
      </LogoStyled>
      <SideBarSpanBgOnPhone
        onClick={handleOnClickSidebarOnPhone}
        isActive={state.isSidebarOpen}
      />

      <SidebarUl>
        <SidebarLi>
          <SidebarHorizBtn
            onClick={handleOnClickBulbs}
            isActive={stateButtons.LIGHT_BULBS}
            type="button"
          >
            <SideBarIcon
              isActive={stateButtons.LIGHT_BULBS}
              isSidebarOnLeft={state.isSidebarOpen}
            >
              <img
                src="./img/icon-light-bulb.png"
                alt="light-bulb"
                loading="lazy"
              />
            </SideBarIcon>
            <SideBarTitleSpan isActive={state.isSidebarOpen}>
              Bombillos
            </SideBarTitleSpan>
          </SidebarHorizBtn>
        </SidebarLi>

        <SidebarLi>
          <SidebarHorizBtn
            onClick={handleOnClickCables}
            isActive={stateButtons.CABLES}
            type="button"
          >
            <SideBarIconCable
              isActive={stateButtons.CABLES}
              isSidebarOnLeft={state.isSidebarOpen}
            >
              <img src="./img/icon-cable.png" alt="cable" loading="lazy" />
            </SideBarIconCable>
            <SideBarTitleSpan isActive={state.isSidebarOpen}>
              Cables
            </SideBarTitleSpan>
          </SidebarHorizBtn>
        </SidebarLi>

        <SidebarLi>
          <SidebarHorizBtn
            onClick={handleOnClickOthers}
            isActive={stateButtons.MISCELLANEUS}
            type="button"
          >
            <SideBarIcon
              isActive={stateButtons.MISCELLANEUS}
              isSidebarOnLeft={state.isSidebarOpen}
            >
              <img
                src="./img/icon-miscellaneus.png"
                alt="cart"
                loading="lazy"
              />
            </SideBarIcon>
            <SideBarTitleSpan isActive={state.isSidebarOpen}>
              Otros
            </SideBarTitleSpan>
          </SidebarHorizBtn>
        </SidebarLi>
      </SidebarUl>
    </SidebarStyled>
  );
};

export default Sidebar;
