import { useState } from "react";
import { storage } from "@/config/firebase-config";
import { ref, deleteObject } from "firebase/storage";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";

interface DeleteImageDBProps {
  currentPage: string;
  product: ProductLightBulbsProps | ProductCablesProps;
}

export const useDeleteImageFirebase = () => {
  const [loadingDeleteImageDB, setLoadingDeleteImageDB] = useState(false);

  const deleteImageDB = async ({
    currentPage,
    product,
  }: DeleteImageDBProps) => {
    setLoadingDeleteImageDB(true);
    try {
      const desertRef = ref(storage, `${currentPage}/${product.image.id}`);

      await deleteObject(desertRef);
    } catch (error) {
      console.log("error deleteImageDB", error);
      setLoadingDeleteImageDB(false);
    }
  };
  return [deleteImageDB, loadingDeleteImageDB] as const;
};
