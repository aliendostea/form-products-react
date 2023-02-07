import { useState, useEffect } from "react";

//// FIX INTERCEFA TYPEEEESS!!!!

let globalState: any = {};
let listeners: any = [];
let actions: any = {};

export const useStore = () => {
  const [, setGlobalState] = useState(globalState);

  const dispatch = (actionIdentifier: any) => {
    const newState = actions[actionIdentifier](globalState);
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

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
