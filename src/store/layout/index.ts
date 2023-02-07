import { initStore } from "../store";

const configureLayoutStore = () => {
  const actions = {
    TOGGLE_SIDEBAR: (currentState) => {
      return { isSidebarOpen: !currentState.isSidebarOpen };
    },
  };
  initStore(actions, { isSidebarOpen: true });
};

export default configureLayoutStore;
