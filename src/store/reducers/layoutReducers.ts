import { LayoutStateProps } from "../context/layoutContext";

type PayloadLayoutTypes =
  | { type: "TOGGLE_SIDEBAR"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: string };

enum CurrentPageValues {
  A = "LIGHT_BULBS",
  B = "CABLES",
  C = "MISCELLANEUS",
  D = "SEARCHING_PRODUCT",
}

export const CURRENT_PAGE_VALUES = {
  LIGHT_BULBS: CurrentPageValues.A,
  CABLES: CurrentPageValues.B,
  MISCELLANEUS: CurrentPageValues.C,
  SEARCHING_PRODUCT: CurrentPageValues.D,
};

export const layoutInitialState: LayoutStateProps = {
  isSidebarOpen: false,
  currentPage: CURRENT_PAGE_VALUES.LIGHT_BULBS,
};

const UPDATE_LAYOUT_BY_ACTION = {
  TOGGLE_SIDEBAR: (state: LayoutStateProps) => {
    return { ...state, isSidebarOpen: !state.isSidebarOpen };
  },

  SET_CURRENT_PAGE: (
    state: LayoutStateProps,
    action: { type: string; payload: string }
  ) => {
    return { ...state, currentPage: action.payload };
  },
};

export const layoutReducer = (
  state: LayoutStateProps,
  action: PayloadLayoutTypes
) => {
  const { type: actionType } = action;
  const updateState = UPDATE_LAYOUT_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};
