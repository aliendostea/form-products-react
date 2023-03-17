import { useState } from "react";
import { Modal, TableProducts } from "@/components";
import { PagesCardBaseStyled } from "@/styles";
import {
  ImagetProps,
  ProductCablesProps,
  ProductLightBulbsProps,
} from "@/models/product";
import { AddNewProduct, AddNewProductTest } from "../home/home.styled";
import EditItemForm from "./EditItemForm";
import useModal from "@/hooks/use-modal";

interface SearchingHomeProps {
  products: [ProductLightBulbsProps & ProductCablesProps];
}

interface SearchingHomeProductProps {
  id?: string;
  internalCode: string;
  name: string;
  price: string;
  published: boolean;
  description: string;
  available: boolean;
  discount: string;
  image: ImagetProps;
  type: string;
  power?: string;
  caliber?: string;
}

const SearchingHome = ({ products }: SearchingHomeProps) => {
  const [productToEdit, setProductToEdit] = useState<SearchingHomeProductProps>(
    {
      id: "",
      internalCode: "",
      name: "",
      price: "",
      power: "",
      published: false,
      description: "",
      available: false,
      discount: "",
      image: {
        id: "",
        name: "",
        route: "",
      },
      type: "",
    }
  );
  const [productTypeSelected, setProductTypeSelected] = useState("");
  const [isActiveEditProductModal, setIsActiveEditProductModal] =
    useState(false);
  const [isModalActive, openModal, closeModal, onMouseDownModal, modalRef] =
    useModal();

  const handleClickEditProduct = (id: string) => {
    const [productSelected] = products.filter(
      (product: SearchingHomeProductProps) => product.id === id
    );
    setProductTypeSelected(productSelected.type);
    setIsActiveEditProductModal(true);
    setProductToEdit(productSelected);
    openModal();
  };

  return (
    <>
      <PagesCardBaseStyled>
        <AddNewProduct>
          <AddNewProductTest />
        </AddNewProduct>
        <TableProducts
          typeProduct={productTypeSelected}
          mainTitle="Searched products"
          dataTableRows={products}
          handleClickEditProduct={handleClickEditProduct}
          isDataLoading={false}
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
          {isActiveEditProductModal && (
            <EditItemForm
              productValues={productToEdit}
              productTypeSelected={productTypeSelected}
            />
          )}
        </>
      </Modal>
    </>
  );
};

export default SearchingHome;
