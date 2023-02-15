import { useState, useEffect } from "react";
import { ProductProps } from "@/models/product";
import { useStore } from "@/store/store";

export const useFilterProduct = () => {
  const [globalState, dispatch] = useStore();
  const [dataFiltered, setDataFiltered] = useState<ProductProps[] | []>([]);
  const [stringToSearch, setStringToSearch] = useState("");

  const filterDataFunction = () =>
    globalState.dataProducts.filter((obj: ProductProps) => {
      return (
        obj.name.toLowerCase().search(stringToSearch.toLowerCase()) !== -1 ||
        obj.internalCode.toLowerCase().search(stringToSearch.toLowerCase()) !==
          -1 ||
        obj.description.toLowerCase().search(stringToSearch.toLowerCase()) !==
          -1
      );
    });

  const setDataToFilter = (stringToSearch: string) => {
    setStringToSearch(stringToSearch);
  };

  useEffect(() => {
    dispatch("SEARCH_PRODUCTS", {
      stringToSearch,
      isFilteringOnKeydown: false,
      dataProductsFiltered: [],
    });

    if (stringToSearch === "") return;

    dispatch("SEARCH_PRODUCTS", {
      stringToSearch,
      isFilteringOnKeydown: true,
      dataProductsFiltered: [],
    });

    const idSetTimeout = setTimeout(() => {
      const arrayFiltered: ProductProps[] | [] = filterDataFunction();

      setDataFiltered(arrayFiltered);
      dispatch("SEARCH_PRODUCTS", {
        stringToSearch,
        isFilteringOnKeydown: false,
        dataProductsFiltered: arrayFiltered,
      });
    }, 1200);

    return () => {
      clearTimeout(idSetTimeout);
    };
  }, [stringToSearch]);

  useEffect(() => {
    if (stringToSearch === "") return;
    const arrayFiltered: ProductProps[] | [] = filterDataFunction();

    /*  const arrayFiltered = useMemo(
      () => filterDataFunction(),
      [globalState.dataProducts]
    ); */

    dispatch("SEARCH_PRODUCTS", {
      stringToSearch,
      isFilteringOnKeydown: false,
      dataProductsFiltered: arrayFiltered,
    });
  }, [globalState.dataProducts]);

  return [dataFiltered, setDataToFilter] as const;
};
