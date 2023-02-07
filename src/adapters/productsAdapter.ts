import { ProductProps } from "@/models/product";

export const createProductsAdapter = (product: ProductProps) => {
  return {
    id: product.id,
    internalCode: product.internalCode,
    name: product.name,
    price: product.price,
    power: product.power,
    description: product.description,
    available: product.available,
    discount: product.discount,
    image: product.image,
  };
};
