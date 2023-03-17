import { useState } from "react";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";
import { useSetImageFirebase } from "./use-set-image";
import { useProducts } from "../use-products";
import { createCablesAdapter, createLightbulbsAdapter } from "@/adapters";

const CREATE_PRODUCT_ADAPTER = {
  lightBulbs: (newProduct: any) => createLightbulbsAdapter(newProduct),
  cables: (newProduct: any) => createCablesAdapter(newProduct),
};

export const useSetDataFirebase = () => {
  const { addProduct } = useProducts({});
  const [isError, setIsError] = useState(false);
  const [loadingSetDocToDB, setLoadingSetDocToDB] = useState(false);
  const [setImageToDB] = useSetImageFirebase();

  const setDocToDB = async (
    currentPage: string,
    collection: CollectionReference<DocumentData>,
    product: ProductLightBulbsProps | ProductCablesProps,
    file: Blob | Uint8Array | ArrayBuffer
  ) => {
    setLoadingSetDocToDB(true);

    try {
      const image = await setImageToDB({
        imageID: product.image.id,
        file: file,
        currentPage: currentPage,
      });
      const cloneOfImage = structuredClone(product.image);

      const imageObj = { ...cloneOfImage, route: image };
      const newProduct: ProductLightBulbsProps | ProductCablesProps = {
        ...product,
        image: {
          id: imageObj.id,
          name: imageObj.name,
          route: imageObj.route,
        },
      };

      const res = await addDoc(collection, newProduct);

      if (res.id) {
        /// revisar
        const cloneProduct = structuredClone(newProduct);
        cloneProduct["id"] = res.id;
        const productToUpdate = doc(db, currentPage, res.id);

        await updateDoc(productToUpdate, {
          ...cloneProduct,
          id: res.id,
        });

        const createProductAdapter =
          CREATE_PRODUCT_ADAPTER[
            currentPage as keyof typeof CREATE_PRODUCT_ADAPTER
          ];
        const addProductObj = createProductAdapter(cloneProduct);

        addProduct({
          product: addProductObj,
          currentPageProductType: currentPage,
        });
        setLoadingSetDocToDB(false);
        setIsError(false);
        return;
      }

      throw new Error("Error in addDoc");
    } catch (error: any) {
      console.log("Error in addDoc", error);
      setLoadingSetDocToDB(false);
      setIsError(true);
      throw new Error(error);
    }
  };
  return [setDocToDB, loadingSetDocToDB, isError] as const;
};
