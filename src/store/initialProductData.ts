import {
  AllProductsProps,
  ProductCablesProps,
  ProductLightBulbsProps,
} from "@/models/product";

export const INITIAL_LIGHT_BULBS_DATA: ProductLightBulbsProps = {
  id: "",
  internalCode: "",
  name: "",
  price: "",
  power: "",
  published: false,
  description: "",
  available: false,
  discount: "",
  image: {
    id: "",
    name: "",
    route: "",
  },
  type: "",
};

export const INITIAL_CABLES_DATA: ProductCablesProps = {
  id: "",
  internalCode: "",
  name: "",
  price: "",
  caliber: "",
  published: false,
  description: "",
  available: false,
  discount: "",
  image: {
    id: "",
    name: "",
    route: "",
  },
  type: "",
};

export const ALL_PRODUCTS: AllProductsProps = {
  allProducts: [{ lightBulbs: [] }, { cables: [] }, { miscellaneus: [] }],
};
