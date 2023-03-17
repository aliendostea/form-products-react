import { useState } from "react";
import { getDocs } from "firebase/firestore";
import { useProducts } from "./use-products";
import { cablesRef, lightbulbsRef } from "@/config/firebase-config";
import { createLightbulbsAdapter } from "@/adapters/lightbulbsAdapter";
import { ProductLightBulbsProps } from "@/models/product";

export const useGetData = () => {
  const { addAllProducts } = useProducts({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /// collection: CollectionReference<DocumentData>

  const getData = async () => {
    setLoading(true);

    try {
      const resLightbulb = await getDocs(lightbulbsRef);
      const resCables = await getDocs(cablesRef);

      const lightbulbsData: any[] = resLightbulb.docs.map((element) =>
        element.data()
      );

      const cablesData = resCables.docs.map((element) => element.data());

      const newArrayLightbulbsData = lightbulbsData.map(
        (lightbulb: ProductLightBulbsProps) =>
          createLightbulbsAdapter(lightbulb)
      );

      const ALL_PRODUCTS = {
        allProducts: [
          { lightBulbs: newArrayLightbulbsData },
          { cables: cablesData },
          { miscellaneus: [] },
        ],
      };

      addAllProducts(ALL_PRODUCTS);
      setLoading(false);

      /* 
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

      
      */
    } catch (error: any) {
      setError(error);
      setLoading(false);
      console.log("error", error);
      throw new Error("error", error);
    }
  };

  return [getData, loading, error] as const;
};
