import { useState } from "react";
import { storage } from "@/config/firebase-config";
import { ref, deleteObject } from "firebase/storage";
import { ProductProps } from "@/models/product";

export const useDeleteImageFirebase = () => {
  const [loadingDeleteImageDB, setLoadingDeleteImageDB] = useState(false);

  const deleteImageDB = async (product: ProductProps) => {
    setLoadingDeleteImageDB(true);
    try {
      const desertRef = ref(storage, `lightbulbs/${product.image.id}`);

      await deleteObject(desertRef);
    } catch (error) {
      console.log("error deleteImageDB", error);
      setLoadingDeleteImageDB(false);
    }
  };
  return [deleteImageDB, loadingDeleteImageDB] as const;
};
