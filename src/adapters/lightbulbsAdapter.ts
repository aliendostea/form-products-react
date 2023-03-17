import { ProductLightBulbsProps } from "@/models/product";

export const createLightbulbsAdapter = (
  product: ProductLightBulbsProps
): ProductLightBulbsProps => {
  return {
    id: product.id,
    internalCode: product.internalCode,
    name: product.name,
    price: product.price,
    power: product.power,
    published: product.published,
    description: product.description,
    available: product.available,
    discount: product.discount,
    image: {
      id: product.image.id,
      name: product.image.name,
      route: product.image.route,
    },
    type: product.type,
  };
};
