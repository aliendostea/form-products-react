import { useState } from "react";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useDeleteImageFirebase } from "./use-detele-image";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";

interface DeleteDocInDBProps {
  productsIDs: string[];
  currentPage: string;
  selectedProducts: [ProductLightBulbsProps & ProductCablesProps];
}

export const useDeleteDataFirebase = () => {
  const batch = writeBatch(db);
  /* const { products } = useProducts({});
  const { allProducts } = products; */
  const [deleteImageDB] = useDeleteImageFirebase();
  const [isError, setIsError] = useState(false);
  const [loadingItemDeleted, setLoadingItemDeleted] = useState(false);

  /*  function filterProductSelected(id: string, currentPage: string) {
    const [productsArray]: any = allProducts.filter(
      (products: ProductLightBulbsProps | ProductCablesProps) =>
        Object.keys(products)[0] === currentPage
    );

    const [productSelected] = productsArray[currentPage].filter(
      (product: ProductLightBulbsProps | ProductCablesProps) =>
        product.id === id
    );
    return productSelected;
  } */

  const deleteDocInDB = async (props: DeleteDocInDBProps) => {
    const { selectedProducts } = props;

    setLoadingItemDeleted(true);

    try {
      for (const product of selectedProducts) {
        /*  const productSelected = filterProductSelected(productID, currentPage); */

        await deleteImageDB({
          product: product,
          productType: product.type,
        });
      }

      const productsToDelete = selectedProducts.map((product: any) => {
        const productToDelete = doc(db, product.type, product.id);
        return productToDelete;
      });

      for (const product of productsToDelete) {
        batch.delete(product);
      }

      await batch.commit();

      setLoadingItemDeleted(false);
      setIsError(false);
    } catch (error) {
      console.log("error deleteDocInDB", error);
      setLoadingItemDeleted(false);
      setIsError(true);
      throw error;
    }
  };

  return [deleteDocInDB, loadingItemDeleted, isError] as const;
};
