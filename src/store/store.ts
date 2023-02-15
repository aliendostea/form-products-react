import { ProductProps } from "@/models/product";
import { useState, useEffect } from "react";

//// FIX INTERCEFA TYPEEEESS!!!!

interface InitialSearchProps {
  stringToSearch: string;
  isFilteringOnKeydown: boolean;
  dataProductsFiltered: ProductProps[] | [];
}

export interface InitialStoreProps {
  dataProducts: ProductProps[];
  isSidebarOpen: boolean;
  searchedProduct: InitialSearchProps;
}

interface UserActionsProps {
  SEARCH_PRODUCTS?: (
    currentState: InitialStoreProps,
    searchedProduct: InitialSearchProps
  ) => void;
  SET_PRODUCTS?: (
    currentState: InitialStoreProps,
    products: ProductProps[]
  ) => void;
  TOGGLE_SIDEBAR?: (currentState: InitialStoreProps) => void;
}

let globalState: any = {};
let listeners: any = [];
let actions: any = {};

export const useStore = () => {
  const [, setGlobalState] = useState(globalState);

  const dispatch = (actionIdentifier: string, payload: any) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };
  //// FIX INTERCEFA TYPEEEESS!!!!

  useEffect(() => {
    listeners.push(setGlobalState);

    return () => {
      listeners = listeners.filter((li: any) => li !== setGlobalState);
    };
  }, [setGlobalState]);

  return [globalState, dispatch] as const;
};

export const initStore = (
  userActions: UserActionsProps,
  initialState: InitialStoreProps
) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
