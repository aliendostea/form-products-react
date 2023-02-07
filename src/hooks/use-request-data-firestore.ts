import { useState } from "react";
import { db } from "@/config/firebase-config";
import { ProductProps } from "@/models/product";
import {
  CollectionReference,
  DocumentData,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { createProductsAdapter } from "@/adapters/productsAdapter";

export const useGetDataFirebase = () => {
  const [data, setData] = useState<ProductProps[]>([]);
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
      setLoading(false);
    } catch (error: any) {
      console.log("error", error);
      setError(error);
      setLoading(false);
    }
  };
  return [data, getData, loading, error] as const;
};

export const useAddDataFirebase = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [loadingAddDocToDB, setLoadingAddDocToDB] = useState(false);

  const addDocToDB = async (
    collection: CollectionReference<DocumentData>,
    product: ProductProps
  ) => {
    setLoadingAddDocToDB(true);
    try {
      const res = await addDoc(collection, product);

      /*  console.log("res", res);
      console.log("res.id", res.id); */
      setIsAdded(true);
      setLoadingAddDocToDB(false);
    } catch (error) {
      console.log("error", error);
      setLoadingAddDocToDB(false);
      setIsAdded(false);
    }
  };
  return [isAdded, addDocToDB, loadingAddDocToDB] as const;
};

export const useUpdateDataFirebase = () => {
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

  async function callBatchDelete(id: string) {
    const productToDelete = doc(db, "products", id);
    console.log("productToDelete", productToDelete);
    batch.delete(productToDelete);
    await batch.commit();
  }

  const deleteDocInDB = async (idsProduct: string[]) => {
    setLoadingItemDeleted(true);
    try {
      const productsToDelete = idsProduct.map((id) => {
        const productToDelete = doc(db, "products", id);
        return productToDelete;
      });

      /*  const productsToDelete2 = productsToDelete.map((product) => {
        batch.delete(product);
      }); */
      for (const product of productsToDelete) {
        batch.delete(product);
      }

      await batch.commit();

      /*  const results = await Promise.allSettled([
        idsProduct.map((id) => callBatchDelete(id)),
      ]);

 */

      /*   const productToDelete = doc(db, "products", idProduct);
      console.log("productToDelete", productToDelete);
      batch.delete(productToDelete);

      await batch.commit(); */

      setIsItemDeleted(true);
      setLoadingItemDeleted(false);
    } catch (error) {
      console.log("error", error);
      setIsItemDeleted(false);
      setLoadingItemDeleted(false);
    }
  };
  return [isItemDeleted, deleteDocInDB, loadingItemDeleted] as const;
};
