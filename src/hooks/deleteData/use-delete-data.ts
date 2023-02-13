import { useState } from "react";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useDeleteImageFirebase } from "../deleteImage/use-detele-image";
import { useStore } from "@/store/store";
import { ProductProps } from "@/models/product";

export const useDeleteDataFirebase = () => {
  const batch = writeBatch(db);
  const [globalState] = useStore();
  const [deleteImageDB] = useDeleteImageFirebase();
  const [isError, setIsError] = useState(false);
  const [loadingItemDeleted, setLoadingItemDeleted] = useState(false);

  function filterProductSelected(id: string) {
    const [productSelected] = globalState.dataProducts.filter(
      (product: ProductProps) => product.id === id
    );
    return productSelected;
  }

  const deleteDocInDB = async (idsProduct: string[]) => {
    setLoadingItemDeleted(true);

    try {
      for (const productID of idsProduct) {
        const productSelected = filterProductSelected(productID);

        await deleteImageDB(productSelected);
      }

      const productsToDelete = idsProduct.map((id) => {
        const productToDelete = doc(db, "products", id);
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
