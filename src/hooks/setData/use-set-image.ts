import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase-config";

export const useSetImageFirebase = () => {
  const [loadingSetImageToDB, setLoadingSetImageToDB] = useState(false);

  const setImageToDB = async (
    imageID: string,
    file: Blob | Uint8Array | ArrayBuffer
  ) => {
    setLoadingSetImageToDB(true);
    try {
      const imageRef = ref(storage, `lightbulbs/${imageID}`);
      await uploadBytes(imageRef, file);

      const imageURL = await getDownloadURL(
        ref(storage, `lightbulbs/${imageID}`)
      );

      setLoadingSetImageToDB(false);
      if (imageURL) {
        return imageURL;
      }
    } catch (error) {
      console.log("error useSetImageFirebase", error);
      setLoadingSetImageToDB(false);
      throw error;
    }
  };
  return [setImageToDB, loadingSetImageToDB] as const;
};
