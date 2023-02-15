import { ProductProps } from "@/models/product";
import { InitialStoreProps, initStore } from "../store";

const INITIAL_PRODUCT_DATA = [
  {
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
  },
];

const INITIAL_SEARCHED_PRODUCT = {
  stringToSearch: "",
  isFilteringOnKeydown: false,
  dataProductsFiltered: [],
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
    searchedProduct: INITIAL_SEARCHED_PRODUCT,
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
    searchedProduct: INITIAL_SEARCHED_PRODUCT,
  });
};

interface InitialSearchProps {
  stringToSearch: string;
  isFilteringOnKeydown: boolean;
  dataProductsFiltered: ProductProps[] | [];
}

export const configureSearchProductsInput = () => {
  const actions = {
    SEARCH_PRODUCTS: (
      currentState: InitialStoreProps,
      searchedProduct: InitialSearchProps
    ) => {
      return {
        ...currentState,
        searchedProduct: {
          stringToSearch: searchedProduct.stringToSearch,
          isFilteringOnKeydown: searchedProduct.isFilteringOnKeydown,
          dataProductsFiltered: searchedProduct.dataProductsFiltered,
        },
      };
    },
  };
  initStore(actions, {
    dataProducts: INITIAL_PRODUCT_DATA,
    isSidebarOpen: true,
    searchedProduct: INITIAL_SEARCHED_PRODUCT,
  });
};
