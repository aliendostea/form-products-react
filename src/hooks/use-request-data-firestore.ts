import { useState } from "react";
import { ProductProps } from "@/models/product";
import { CollectionReference, DocumentData, getDocs } from "firebase/firestore";
import { createProductsAdapter } from "@/adapters/productsAdapter";
import { useStore } from "@/store/store";

export const useGetDataFirebase = () => {
  const [data, setData] = useState<ProductProps[]>([]);
  const [, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async (collection: CollectionReference<DocumentData>) => {
    setLoading(true);

    try {
      const res = await getDocs(collection);
      const resGetDocs = res.docs.map((doc) => ({
        id: doc.id,
        internalCode: doc.data().internalCode,
        name: doc.data().name,
        price: doc.data().price,
        power: doc.data().power,
        description: doc.data().description,
        available: doc.data().available,
        discount: doc.data().discount,
        image: doc.data().image,
      }));

      const product = resGetDocs.map((element) =>
        createProductsAdapter(element)
      );

      setData(product);
      dispatch("SET_PRODUCTS", product);

      setLoading(false);
    } catch (error: any) {
      console.log("error", error);
      setError(error);
      setLoading(false);
    }
  };
  return [data, getData, loading, error] as const;
};

/* export const useUpdateDataFirebase = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [loadingUpdateDoc, setLoadingUpdate] = useState(false);

  const updateDocToDB = async (product: any) => {
    setLoadingUpdate(true);
    try {
      const productToUpdate = doc(db, "products", product.id);
      await updateDoc(productToUpdate, { ...product });

      setIsUpdate(true);
      setLoadingUpdate(false);
    } catch (error) {
      console.log("error", error);
      setIsUpdate(false);
      setLoadingUpdate(false);
    }
  };
  return [isUpdate, updateDocToDB, loadingUpdateDoc] as const;
};

export const useDeleteDataFirebase = () => {
  const batch = writeBatch(db);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [loadingItemDeleted, setLoadingItemDeleted] = useState(false);

  const deleteDocInDB = async (idsProduct: string[]) => {
    setLoadingItemDeleted(true);
    try {
      const productsToDelete = idsProduct.map((id) => {
        const productToDelete = doc(db, "products", id);
        return productToDelete;
      });

      for (const product of productsToDelete) {
        batch.delete(product);
      }

      await batch.commit();


      setIsItemDeleted(true);
      setLoadingItemDeleted(false);
    } catch (error) {
      console.log("error", error);
      setIsItemDeleted(false);
      setLoadingItemDeleted(false);
    }
  };
  return [isItemDeleted, deleteDocInDB, loadingItemDeleted] as const;
}; */
