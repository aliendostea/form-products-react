import { useState } from "react";
import {
  AddNewProduct,
  AddNewProductBtn,
  Modal,
  TableProducts,
} from "@/components";
import AddIcon from "@mui/icons-material/Add";
import useModal from "@/hooks/use-modal";
import EditCablesForm from "./EditCablesForm";
import AddCablesForm from "./AddCablesForm";
import { INITIAL_CABLES_DATA } from "@/store/initialProductData";
import { ProductCablesProps } from "@/models/product";
import { PagesCardBaseStyled } from "@/styles";

interface CablesHomeProps {
  products: ProductCablesProps[];
  loadingData: boolean;
}

const CablesHome = ({ products, loadingData }: CablesHomeProps) => {
  const [productToEdit, setProductToEdit] =
    useState<ProductCablesProps>(INITIAL_CABLES_DATA);
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
      (product: ProductCablesProps) => product.id === id
    );
    setIsActiveEditProductModal(true);
    setProductToEdit(productSelected);
    openModal();
  };

  return (
    <>
      <PagesCardBaseStyled>
        <AddNewProduct>
          <AddNewProductBtn onClick={handleCardOnClick}>
            <AddIcon />
            <span>Add product</span>
          </AddNewProductBtn>
        </AddNewProduct>

        <TableProducts
          typeProduct="cables"
          mainTitle="Cables products"
          dataTableRows={products}
          handleClickEditProduct={handleClickEditProduct}
          isDataLoading={loadingData}
          isFilteringOnKeydown={false}
        />
      </PagesCardBaseStyled>

      <Modal
        isModalActive={isModalActive}
        closeModal={closeModal}
        onMouseDownModal={onMouseDownModal}
        modalRef={modalRef}
      >
        <>
          {isActiveEditProductModal === false && <AddCablesForm />}
          {isActiveEditProductModal && (
            <EditCablesForm productValues={productToEdit} />
          )}
        </>
      </Modal>
    </>
  );
};

export default CablesHome;
