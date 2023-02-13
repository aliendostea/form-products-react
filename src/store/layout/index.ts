import { ProductProps } from "@/models/product";
import { InitialStoreProps, initStore } from "../store";

const INITIAL_PRODUCT_DATA = {
  id: "",
  internalCode: "",
  name: "",
  price: "",
  power: "",
  description: "",
  available: false,
  discount: "",
  image: {
    id: "",
    name: "",
    route: "",
  },
};

const configureLayoutStore = () => {
  const actions = {
    TOGGLE_SIDEBAR: (currentState: InitialStoreProps) => {
      return { ...currentState, isSidebarOpen: !currentState.isSidebarOpen };
    },
  };
  initStore(actions, {
    dataProducts: INITIAL_PRODUCT_DATA,
    isSidebarOpen: true,
  });
};

export default configureLayoutStore;

export const configureProductsStore = () => {
  const actions = {
    SET_PRODUCTS: (
      currentState: InitialStoreProps,
      products: ProductProps[]
    ) => {
      return { ...currentState, dataProducts: products };
    },
  };
  initStore(actions, {
    dataProducts: INITIAL_PRODUCT_DATA,
    isSidebarOpen: true,
  });
};
