import { useState } from "react";
import { db } from "@/config/firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { useSetImageFirebase } from "../setData/use-set-image";

export const useUpdateDataFirebase = () => {
  const [isError, setIsError] = useState(false);
  const [loadingUpdateDoc, setLoadingUpdate] = useState(false);
  const [setImageToDB] = useSetImageFirebase();

  const updateDocToDB = async (
    currentPage: string,
    product: any,
    file: Blob | Uint8Array | ArrayBuffer,
    isAnEmptyFile: boolean
  ) => {
    setLoadingUpdate(true);
    try {
      let imageURL = null;

      if (isAnEmptyFile === false) {
        imageURL = await setImageToDB({
          imageID: product.image.id,
          file: file,
          currentPage: currentPage,
        });
      }

      const productToUpdate = doc(db, currentPage, product.id);

      await updateDoc(productToUpdate, {
        ...product,
        image: {
          id: product.image.id,
          name: product.image.name,
          route: imageURL ? imageURL : product.image.route,
        },
      });

      setLoadingUpdate(false);
      setIsError(false);
    } catch (error) {
      console.log("error updateDocToDB", error);
      setLoadingUpdate(false);
      setIsError(true);
      throw error;
    }
  };
  return [updateDocToDB, loadingUpdateDoc, isError] as const;
};
