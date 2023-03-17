import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase-config";

interface SetImageToDBPRops {
  currentPage: string;
  imageID: string;
  file: Blob | Uint8Array | ArrayBuffer;
}

export const useSetImageFirebase = () => {
  const [loadingSetImageToDB, setLoadingSetImageToDB] = useState(false);

  const setImageToDB = async (props: SetImageToDBPRops) => {
    setLoadingSetImageToDB(true);
    try {
      const { currentPage, imageID, file } = props;
      const imageRef = ref(storage, `${currentPage}/${imageID}`);
      await uploadBytes(imageRef, file);

      const imageURL = await getDownloadURL(
        ref(storage, `${currentPage}/${imageID}`)
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
