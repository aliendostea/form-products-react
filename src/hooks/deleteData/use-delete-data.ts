import { useState } from "react";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useDeleteImageFirebase } from "./use-detele-image";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";
import { useProducts } from "../use-products";

interface DeleteDocInDBProps {
  productsIDs: string[];
  currentPage: string;
}

export const useDeleteDataFirebase = () => {
  const batch = writeBatch(db);
  const { products } = useProducts({});
  const { allProducts } = products;
  const [deleteImageDB] = useDeleteImageFirebase();
  const [isError, setIsError] = useState(false);
  const [loadingItemDeleted, setLoadingItemDeleted] = useState(false);

  function filterProductSelected(id: string, currentPage: string) {
    const [productsArray]: any = allProducts.filter(
      (products: ProductLightBulbsProps | ProductCablesProps) =>
        Object.keys(products)[0] === currentPage
    );

    const [productSelected] = productsArray[currentPage].filter(
      (product: ProductLightBulbsProps | ProductCablesProps) =>
        product.id === id
    );
    return productSelected;
  }

  const deleteDocInDB = async (props: DeleteDocInDBProps) => {
    const { productsIDs, currentPage } = props;

    setLoadingItemDeleted(true);

    try {
      for (const productID of productsIDs) {
        const productSelected = filterProductSelected(productID, currentPage);

        await deleteImageDB({
          product: productSelected,
          currentPage: currentPage,
        });
      }

      const productsToDelete = productsIDs.map((id) => {
        const productToDelete = doc(db, currentPage, id);
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
