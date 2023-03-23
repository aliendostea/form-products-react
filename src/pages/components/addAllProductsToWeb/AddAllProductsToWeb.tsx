import { useState } from "react";
import { useUpdateDataFirebase } from "@/hooks/updateData/use-update-data";
import {
  AddNewProductBtn,
  Modal,
  NotificationToast,
  TitleStyled2,
} from "@/components";
import { useProducts } from "@/hooks/use-products";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import useModal from "@/hooks/use-modal";
import Card from "@/components/card";
import { ParenBtnModal } from "@/components/table/EnhancedTableToolbar/EnhancedTableToolbar.styled";
import { BtnModal, ButtonLoader } from "@/components/modal/Modal.style";
import styled from "styled-components";
import { ProductCablesProps, ProductLightBulbsProps } from "@/models/product";
import { InputFilesImageProps } from "@/models/form";

export const SpanText = styled.span`
  text-align: center;
  margin-top: 17px;
`;

export const SpanCountProductsText = styled.span`
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--color-primary);
`;

export const BtnAddAll = styled(AddNewProductBtn)`
  background-color: #f6f6f6;

  & > svg {
    width: 2.6rem;
    fill: var(--color-primary);
  }

  & span {
    color: var(--color-primary);
  }
`;

interface GetAllProductsToFilterProps {
  allProducts: [ProductCablesProps | ProductLightBulbsProps];
  filter: string;
}

interface SetAllProductsPublishedTrueProps {
  products: ProductCablesProps[] | ProductLightBulbsProps[];
}

interface EditItemProps {
  product: ProductCablesProps | ProductLightBulbsProps;
  productType: string;
}

const TESTTING = false;

function getAllProductsToFilter({
  allProducts,
  filter,
}: GetAllProductsToFilterProps):
  | ProductCablesProps[]
  | ProductLightBulbsProps[] {
  const [products]: any = allProducts.filter(
    (products) => Object.keys(products)[0] === filter
  );
  return products[filter];
}

function setAllProductsPublishedTrue({
  products,
}: SetAllProductsPublishedTrueProps) {
  const productsClone = structuredClone(products);
  let newArrayProduc: any = [];

  for (const product of productsClone) {
    if (product["published"] === TESTTING) {
      product["published"] = true;
    }
    newArrayProduc = newArrayProduc.concat([product]);
  }

  return newArrayProduc;
}

const AddAllProductsToWeb = () => {
  const { products, addAllProducts } = useProducts({});
  const { allProducts } = products;
  const [updateDocToDB, loadingUpdateDoc, isError] = useUpdateDataFirebase();
  const [productsCount, setProductsCount] = useState(0);
  const [isToastActive, setIsToastActive] = useState(false);
  const [inputFilesImage] = useState<InputFilesImageProps>({
    objectURL: "",
    file: new Uint8Array([0, 0, 0, 0, 0]),
  });
  const [isModalActive, openModal, closeModal, onMouseDownModal, modalRef] =
    useModal();

  const editItem = async ({ product, productType }: EditItemProps) => {
    try {
      await updateDocToDB(
        productType,
        product,
        inputFilesImage.file,
        inputFilesImage.objectURL === ""
      );

      setProductsCount(0);

      setTimeout(() => {
        setIsToastActive(true);
        closeModal();
      }, 900);
    } catch (error) {
      console.log("error in AddAllProductsToWeb", error);
    }
  };

  const handleAddAllProducts = () => {
    const allProductsClone = structuredClone(allProducts);

    const lightBulbs = getAllProductsToFilter({
      allProducts: allProductsClone,
      filter: "lightBulbs",
    });
    const cables = getAllProductsToFilter({
      allProducts: allProductsClone,
      filter: "cables",
    });

    const lightBulbsProducts = setAllProductsPublishedTrue({
      products: lightBulbs,
    });
    const cablesProducts = setAllProductsPublishedTrue({
      products: cables,
    });

    Promise.allSettled([
      lightBulbsProducts.map((element: ProductLightBulbsProps) => {
        editItem({ product: element, productType: "lightBulbs" });
      }),
      cablesProducts.map((element: ProductCablesProps) => {
        editItem({ product: element, productType: "cables" });
      }),
    ]);

    const ALL_PRODUCTS = {
      allProducts: [
        { lightBulbs: lightBulbsProducts },
        { cables: cablesProducts },
        { miscellaneus: [] },
      ],
    };

    addAllProducts(ALL_PRODUCTS);
  };

  const getAllProductsPublished = () => {
    const allProductsClone = structuredClone(allProducts);

    const lightBulbs = getAllProductsToFilter({
      allProducts: allProductsClone,
      filter: "lightBulbs",
    });
    const cables = getAllProductsToFilter({
      allProducts: allProductsClone,
      filter: "cables",
    });
    const allProductsArrayToFilter = [...lightBulbs, ...cables];

    const notPublishedProducts = allProductsArrayToFilter.filter(
      (element) => element.published === TESTTING
    );

    setProductsCount(notPublishedProducts.length);
  };

  const handleOpenModal = () => {
    openModal();
    getAllProductsPublished();
  };

  return (
    <>
      <BtnAddAll onClick={handleOpenModal}>
        <FileUploadIcon />
        <span>Add all products to web</span>
      </BtnAddAll>

      <Modal
        isModalActive={isModalActive}
        closeModal={closeModal}
        onMouseDownModal={onMouseDownModal}
        modalRef={modalRef}
      >
        <Card>
          <>
            <TitleStyled2>Add all product to the web</TitleStyled2>

            {productsCount > 0 && (
              <SpanText>
                ¿Estas seguro que deseas publicar{" "}
                <SpanCountProductsText>{productsCount}</SpanCountProductsText>{" "}
                <br /> productos a la web?
              </SpanText>
            )}

            {productsCount === 0 && (
              <SpanText>Todos los productos están publicados</SpanText>
            )}

            <ParenBtnModal>
              {productsCount > 0 && (
                <BtnModal
                  bg="#CFCFCF"
                  color="#3b3b3b"
                  onClick={() => closeModal()}
                >
                  Cancel
                </BtnModal>
              )}
              {productsCount > 0 && loadingUpdateDoc === false && (
                <BtnModal
                  bg="var(color-primary)"
                  color="#f4f4f4"
                  onClick={handleAddAllProducts}
                >
                  Add all
                </BtnModal>
              )}
              {productsCount > 0 && loadingUpdateDoc && (
                <BtnModal
                  bg="#C2944F"
                  color="#f4f4f4"
                  onClick={handleAddAllProducts}
                >
                  <ButtonLoader></ButtonLoader>
                </BtnModal>
              )}

              {productsCount === 0 && (
                <BtnModal
                  bg="#CFCFCF"
                  color="#3b3b3b"
                  onClick={() => closeModal()}
                >
                  Go back
                </BtnModal>
              )}
            </ParenBtnModal>
          </>
        </Card>
      </Modal>
      <NotificationToast
        title="Productos publicados correctamente"
        isToastActive={isToastActive}
        errorTitle="Error publicando productos"
        isErrorActive={isError}
        setIsToastActive={setIsToastActive}
      />
    </>
  );
};

export default AddAllProductsToWeb;
