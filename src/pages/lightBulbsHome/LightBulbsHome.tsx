import { Suspense, lazy, useState } from "react";
import {
  AddNewProduct,
  AddNewProductBtn,
  Modal,
  TableProductsOnLoad,
} from "@/components";
import AddIcon from "@mui/icons-material/Add";
import useModal from "@/hooks/use-modal";
import AddBulbsForm from "./AddBulbsForm";
import EditBulbsForm from "./EditBulbsForm";
import { ProductLightBulbsProps } from "@/models/product";
import { INITIAL_LIGHT_BULBS_DATA } from "@/store/initialProductData";
import { PagesCardBaseStyled } from "@/styles";
import { AddAllProductsToWeb } from "../components/addAllProductsToWeb";
const TableProducts: any = lazy(() =>
  import("../../components/table").then(({ TableProducts }) => ({
    default: TableProducts,
  }))
);

interface LightBulbsHomeProps {
  products: ProductLightBulbsProps[];
  loadingData: boolean;
}

const LightBulbsHome = ({ products, loadingData }: LightBulbsHomeProps) => {
  const [productToEdit, setProductToEdit] = useState<ProductLightBulbsProps>(
    INITIAL_LIGHT_BULBS_DATA
  );
  const [isActiveEditProductModal, setIsActiveEditProductModal] =
    useState(false);
  const [isModalActive, openModal, closeModal, onMouseDownModal, modalRef] =
    useModal();
  const handleCardOnClick = () => {
    setIsActiveEditProductModal(false);
    openModal();
  };

  const handleClickEditProduct = (id: string) => {
    const [productSelected] = products.filter(
      (product: ProductLightBulbsProps) => product.id === id
    );
    setIsActiveEditProductModal(true);
    setProductToEdit(productSelected);
    openModal();
  };

  return (
    <>
      <PagesCardBaseStyled>
        <AddNewProduct>
          <AddAllProductsToWeb />
          <AddNewProductBtn onClick={handleCardOnClick}>
            <AddIcon />
            <span>Add product</span>
          </AddNewProductBtn>
        </AddNewProduct>

        <Suspense fallback={<TableProductsOnLoad />}>
          <TableProducts
            typeProduct="lightBulbs"
            mainTitle="Bombillos products"
            dataTableRows={products}
            handleClickEditProduct={handleClickEditProduct}
            isDataLoading={loadingData}
            isFilteringOnKeydown={false}
          />
        </Suspense>
      </PagesCardBaseStyled>

      <Modal
        isModalActive={isModalActive}
        closeModal={closeModal}
        onMouseDownModal={onMouseDownModal}
        modalRef={modalRef}
      >
        <>
          {isActiveEditProductModal === false && <AddBulbsForm />}
          {isActiveEditProductModal && (
            <EditBulbsForm productValues={productToEdit} />
          )}
        </>
      </Modal>
    </>
  );
};

export default LightBulbsHome;
