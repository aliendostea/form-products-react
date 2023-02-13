import { useEffect, useState } from "react";
import DataTable from "@/components/table";
import useModal from "@/hooks/use-modal";
import Modal from "@/components/modal";
import AddIcon from "@mui/icons-material/Add";
import { productsCollectionRef } from "@/config/firebase-config";
import { useGetDataFirebase } from "@/hooks/use-request-data-firestore";
import HomeFormInput from "./HomeFormInput";
import { AddNewProduct, AddNewProductBtn, HomeStyled } from "./home.styled";
import HomeEditItemForm from "./HomeEditItemForm";
import { ProductProps } from "@/models/product";

const Home = () => {
  const [data, getData, loading] = useGetDataFirebase();
  const [productToEdit, setProductToEdit] = useState<ProductProps>({
    id: "",
    internalCode: "",
    name: "",
    price: "",
    power: "",
    description: "",
    available: false,
    discount: "",
    image: {
      id: "",
      name: "",
      route: "",
    },
  });
  const [isActiveEditProductModal, setIsActiveEditProductModal] =
    useState(false);
  const [isModalActive, openModal, closeModal, onMouseDownModal, modalRef] =
    useModal();
  //////// hay que cambiar los permisos de quien está autorizado en modificar la DDBB
  const handleCardOnClick = () => {
    setIsActiveEditProductModal(false);
    openModal();
  };

  const handleClickEditProduct = (id: string) => {
    const [productSelected] = data.filter((product) => product.id === id);
    setIsActiveEditProductModal(true);
    setProductToEdit(productSelected);
    openModal();
  };
  /*  
  const removeItemProductFromArray = async (idsArray: string[]) => {
    const newArrayProducts = data.filter(
      (product) => idsArray.some((id) => product.id === id) === false
    );
    */
  /*  await deleteDocInDB([...idsArray, "not9999"]);

    getData(productsCollectionRef); 
  };
  */

  useEffect(() => {
    getData(productsCollectionRef);
    ////  crear createProductsAdapter
  }, []);

  return (
    <HomeStyled>
      <AddNewProduct>
        <AddNewProductBtn onClick={handleCardOnClick}>
          <AddIcon />
          <span>Add product</span>
        </AddNewProductBtn>
      </AddNewProduct>
      <DataTable
        dataTableRows={data}
        getData={getData}
        handleClickEditProduct={handleClickEditProduct}
        isDataLoading={loading}
      />
      <Modal
        isModalActive={isModalActive}
        closeModal={closeModal}
        onMouseDownModal={onMouseDownModal}
        modalRef={modalRef}
      >
        <>
          {isActiveEditProductModal === false && (
            <HomeFormInput getData={getData} />
          )}
          {isActiveEditProductModal && (
            <HomeEditItemForm productValues={productToEdit} getData={getData} />
          )}
        </>
      </Modal>
    </HomeStyled>
  );
};

export default Home;
