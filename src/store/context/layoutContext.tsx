import { useReducer, createContext } from "react";
import { layoutInitialState, layoutReducer } from "../reducers/layoutReducers";

export interface LayoutStateProps {
  isSidebarOpen: boolean;
  currentPage: string;
}

interface LayoutCreateContext {
  state: LayoutStateProps;
  toggleSidebar: () => void;
  setCurrentPage: (currentPage: string) => void;
}

interface LayoutProviderProps {
  children: JSX.Element;
}

export const LayoutContext = createContext<LayoutCreateContext | undefined>(
  undefined
);

function useLayoutReducer() {
  const [state, dispatch] = useReducer(layoutReducer, layoutInitialState);

  const toggleSidebar = () => {
    return dispatch({
      type: "TOGGLE_SIDEBAR",
      payload: "",
    });
  };

  const setCurrentPage = (currentPage: string) => {
    return dispatch({
      type: "SET_CURRENT_PAGE",
      payload: currentPage,
    });
  };

  return { state, toggleSidebar, setCurrentPage };
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const { state, toggleSidebar, setCurrentPage } = useLayoutReducer();

  return (
    <LayoutContext.Provider
      value={{
        state: state,
        toggleSidebar,
        setCurrentPage,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
