import {
  AllProductsProps,
  ProductCablesProps,
  ProductLightBulbsProps,
} from "@/models/product";
import { useReducer, createContext } from "react";
import {
  productsInitialState,
  productsReducer,
} from "../reducers/productsReducers";

type AddProductFunctionType = {
  product: ProductLightBulbsProps | ProductCablesProps;
  currentPageProductType: string;
};

interface ProductsContextProps {
  products: AllProductsProps;
  addAllProducts: (products: AllProductsProps) => void;
  addProduct: (action: AddProductFunctionType) => void;
}

export const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined
);

function useProductsReducer() {
  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

  const addAllProducts = (products: AllProductsProps) => {
    return dispatch({
      type: "ADD_ALL_PRODUCTS",
      payload: products,
    });
  };

  const addProduct = ({
    product,
    currentPageProductType,
  }: AddProductFunctionType) => {
    return dispatch({
      type: "ADD_PRODUCT",
      payload: product,
      currentPageProductType: currentPageProductType,
    });
  };

  return { state, addAllProducts, addProduct };
}

interface ProductsProviderProps {
  children: JSX.Element;
}

export function ProductsProvider({ children }: ProductsProviderProps) {
  const { state, addAllProducts, addProduct } = useProductsReducer();

  return (
    <ProductsContext.Provider
      value={{
        products: state,
        addAllProducts,
        addProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
