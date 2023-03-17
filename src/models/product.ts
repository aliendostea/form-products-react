export interface ImagetProps {
  id: string;
  name: string;
  route: string | undefined;
}

export interface ProductPropsMain {
  id?: string;
  internalCode: string;
  name: string;
  price: string;
  published: boolean;
  description: string;
  available: boolean;
  discount: string;
  image: ImagetProps;
  type: string;
}

export interface ProductLightBulbsProps extends ProductPropsMain {
  power: string;
}

export interface ProductCablesProps extends ProductPropsMain {
  caliber: string;
}

export interface AllProductsProps {
  allProducts: [
    { lightBulbs: ProductLightBulbsProps[] },
    { cables: ProductCablesProps[] },
    { miscellaneus: [] }
  ];
}
