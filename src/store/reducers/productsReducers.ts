import {
  AllProductsProps,
  ProductCablesProps,
  ProductLightBulbsProps,
} from "@/models/product";
import { ALL_PRODUCTS } from "../initialProductData";

type addAllProductsType = {
  type: "ADD_ALL_PRODUCTS";
  payload: AllProductsProps;
};
type addProductType = {
  type: "ADD_PRODUCT";
  payload: ProductLightBulbsProps | ProductCablesProps;
  currentPageProductType: string;
};

/* type ProductsActionTypes =
  | addAllProductsType
  | addProductType
  | deleteProductsType; */

export const productsInitialState: AllProductsProps = ALL_PRODUCTS;

const UPDATE_STATE_BY_ACTION = {
  ADD_ALL_PRODUCTS: (state: AllProductsProps, action: addAllProductsType) => {
    const newState = { allProducts: [...action.payload.allProducts] };

    return newState;
  },

  ADD_PRODUCT: (state: AllProductsProps, action: addProductType) => {
    const { currentPageProductType, payload } = action;
    const { allProducts } = structuredClone(state);

    const allProductsFiltered = allProducts.filter(
      (products) => Object.keys(products)[0] !== currentPageProductType
    );
    const [productsArray]: any = allProducts.filter(
      (products) => Object.keys(products)[0] === currentPageProductType
    );

    const newArrayProducts = [
      ...productsArray[currentPageProductType],
      payload,
    ];

    const ALL_PRODUCTS = {
      allProducts: [
        ...allProductsFiltered,
        { [currentPageProductType]: newArrayProducts },
      ],
    };

    return ALL_PRODUCTS;
  },

  /*  DELETE_PRODUCTS: (state: AllProductsProps[] | [], action: deleteProductsType) => {
    //// TO DO!
    return state;
  }, */
};

export const productsReducer = (state: any, action: any) => {
  const { type: actionType } = action;
  const updateState =
    UPDATE_STATE_BY_ACTION[actionType as keyof typeof UPDATE_STATE_BY_ACTION];
  return updateState ? updateState(state, action) : state;
};
