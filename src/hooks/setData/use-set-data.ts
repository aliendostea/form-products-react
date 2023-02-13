import { useState } from "react";
import { ProductProps } from "@/models/product";
import { CollectionReference, DocumentData, addDoc } from "firebase/firestore";
import { useSetImageFirebase } from "./use-set-image";

export const useSetDataFirebase = () => {
  const [isError, setIsError] = useState(false);
  const [loadingSetDocToDB, setLoadingSetDocToDB] = useState(false);
  const [setImageToDB] = useSetImageFirebase();

  const setDocToDB = async (
    collection: CollectionReference<DocumentData>,
    product: ProductProps,
    file: Blob | Uint8Array | ArrayBuffer
  ) => {
    setLoadingSetDocToDB(true);
    try {
      const image = await setImageToDB(product.image.id, file);
      const cloneOfImage = structuredClone(product.image);
      /* const imageObj = new Map<string, string   | undefined>(cloneOfImage); */
      /* imageObj.set("route", image); */

      const imageObj = { ...cloneOfImage, route: image };

      await addDoc(collection, {
        ...product,
        image: {
          id: imageObj.id,
          name: imageObj.name,
          route: imageObj.route,
        },
      });

      /* console.log("res", res);
      console.log("res.id", res.id); */
      setLoadingSetDocToDB(false);
      setIsError(false);
    } catch (error) {
      console.log("error in setLoadingSetDocToDB", error);
      setLoadingSetDocToDB(false);
      setIsError(true);
      throw error;
    }
  };
  return [setDocToDB, loadingSetDocToDB, isError] as const;
};
