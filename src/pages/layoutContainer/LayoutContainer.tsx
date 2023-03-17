import { useEffect } from "react";
import { useLayout } from "@/hooks/use-layout";
import { LightBulbsHome } from "../lightBulbsHome";
import { useGetData } from "@/hooks/use-get-data";
import { TestCurrentData } from "@/components/testCurrentData";
import { useProducts } from "@/hooks/use-products";
import { useFilters } from "@/hooks/use-filters";
import { CablesHome } from "../cablesHome";
import { MiscellaneusHome } from "../miscellaneusHome";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";
import { SearchingHome } from "../searchingHome";

interface CurrentPageRenderProps {
  currentPage: string;
  products: any;
  searchProducts: [ProductLightBulbsProps & ProductCablesProps];
  stringToSearch: string;
  loadingData: boolean;
}

interface ProductsArrayProps {
  productsArray:
    | {
        lightBulbs: ProductLightBulbsProps[];
      }
    | {
        cables: ProductCablesProps[];
      }
    | { miscellaneus: [] };
}

const KEYS_PRODUCTS = {
  LIGHT_BULBS: "lightBulbs",
  CABLES: "cables",
  MISCELLANEUS: "miscellaneus",
};

/* const COMPONENTS_PAGES2 = {
  LIGHT_BULBS: (products, loadingData)=> (
    <LightBulbsHome products={products} loadingData={loadingData} />
  ),
  CABLES: (products, loadingData) => <CablesHome products={products} loadingData={loadingData} />,
  MISCELLANEUS: <MiscellaneusHome />,
}; */

const CurrentPageRender = ({
  currentPage,
  products,
  searchProducts,
  stringToSearch,
  loadingData,
}: CurrentPageRenderProps) => {
  const COMPONENTS_PAGES = {
    LIGHT_BULBS: (
      <LightBulbsHome products={products} loadingData={loadingData} />
    ),
    CABLES: <CablesHome products={products} loadingData={loadingData} />,
    MISCELLANEUS: <MiscellaneusHome />,
  };

  if (stringToSearch) {
    return <SearchingHome products={searchProducts} />;
  }

  return COMPONENTS_PAGES[currentPage as keyof typeof COMPONENTS_PAGES];
};

const LayoutContainer = () => {
  const { state } = useLayout();
  const { filters } = useFilters();
  const { stringToSearch } = filters;

  const { currentPage } = state;
  const { products, searchProducts } = useProducts({
    currentPage: currentPage,
  });
  const { allProducts } = products;
  const [getData, loading] = useGetData();

  const filterProductsParent = () => {
    const currentActiveProduct =
      KEYS_PRODUCTS[currentPage as keyof typeof KEYS_PRODUCTS];

    const [newArray] = allProducts.filter(
      (productsArray: ProductsArrayProps) =>
        productsArray[currentActiveProduct as keyof typeof productsArray]
    );

    return newArray[currentActiveProduct];
  };

  const filteredProduct = filterProductsParent();

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {import.meta.env.VITE_TEST_RESPONSIVE && <TestCurrentData />}
      <CurrentPageRender
        currentPage={currentPage}
        searchProducts={searchProducts}
        products={filteredProduct}
        stringToSearch={stringToSearch}
        loadingData={loading}
      />
    </>
  );
};

export default LayoutContainer;
