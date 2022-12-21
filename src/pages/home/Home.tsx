import { useState } from "react";
import { Button } from "@/components/button";
import { useFormik } from "formik";
import { AddNewProduct, AddNewProductBtn, HomeStyled } from "./home.styled";
import * as Yup from "yup";
import styled from "styled-components";
import Card from "@/components/card";
import Textfield from "@/components/textField";
import DataTable from "@/components/table";
import useModal from "@/hooks/use-modal";
import Modal from "@/components/modal";
import AddIcon from "@mui/icons-material/Add";

export interface ProductProps {
  id: string;
  internalCode: string;
  name: string;
  price: string;
  power: string;
  description: string;
  available: string;
  discount: string;
  image: string;
}

const initialValues: ProductProps = {
  id: "",
  internalCode: "",
  name: "",
  price: "",
  power: "",
  description: "",
  available: "",
  discount: "",
  image: "",
};

export const FormStyled = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 1rem;

  & button {
    grid-column: 1 / 4;
  }
`;

export const ProductHorizontalStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2rem 1rem;

  & span {
    font-size: 1.7rem;
  }
`;

function createProvisionalId() {
  const date = new Date();
  const comb1 = date.getMilliseconds().toString();
  const comb2 = Math.random().toString(36).substring(2, 8);
  return `${comb1}-${comb2}`;
}

function createCurrencyAndPrice(price: string): string {
  return `$${price}`;
}

export const validationSchema = Yup.object({
  name: Yup.string().min(3, "Must be 15 characters or less").required(),
  internalCode: Yup.string().min(3).required(),
  price: Yup.string().min(3).required(),
  power: Yup.string().required(),
  description: Yup.string().required(),
  /*  available: Yup.bool().oneOf([true], "Field must be checked"), */
  discount: Yup.string().required(),
  image: Yup.string().required(),
});

const Home = () => {
  const [addedProducts, setAddedProducts] = useState<ProductProps[]>([
    {
      id: "1",
      internalCode: "2332-567",
      name: "Bombillo LED dicróico. Rosca GU10",
      price: createCurrencyAndPrice("10.8"),
      power: "5W",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      available: "true",
      discount: "20%",
      image: "bombillo-LED-dicróico.png",
    },
  ]);
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        const id = createProvisionalId();
        const { price } = values;
        const newArray = [
          ...addedProducts,
          { ...values, id, price: createCurrencyAndPrice(price) },
        ];
        setAddedProducts(newArray);
      },
      validationSchema,
    });
  const [isModalActive, openModal, closeModal, onMouseDownModal, modalRef] =
    useModal();

  const handleCardOnClick = () => {
    openModal();
  };

  const removeItemProductFromArray = (idsArray: string[]) => {
    const newArrayProducts = addedProducts.filter(
      (product) => idsArray.some((id) => product.id === id) === false
    );

    setAddedProducts(newArrayProducts);
  };

  return (
    <HomeStyled>
      <AddNewProduct>
        <AddNewProductBtn onClick={handleCardOnClick}>
          <AddIcon />
          <span>Add product</span>
        </AddNewProductBtn>
      </AddNewProduct>
      <DataTable
        dataTableRows={addedProducts}
        removeItemProductFromArray={removeItemProductFromArray}
      />
      <Modal
        isModalActive={isModalActive}
        closeModal={closeModal}
        onMouseDownModal={onMouseDownModal}
        modalRef={modalRef}
      >
        <Card>
          <>
            <FormStyled onSubmit={handleSubmit} aria-label="form">
              <Textfield
                id="name"
                name="name"
                type="text"
                value={values.name}
                label="Product name"
                placeholder="Product name"
                touched={touched.name}
                error={errors?.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Textfield
                id="internalCode"
                name="internalCode"
                type="text"
                label="Internal Code"
                value={values.internalCode}
                placeholder="InternalCode"
                touched={touched.internalCode}
                error={errors?.internalCode}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Textfield
                id="price"
                name="price"
                type="text"
                label="Price"
                value={values.price}
                placeholder="Price"
                touched={touched.price}
                error={errors?.price}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Textfield
                id="power"
                name="power"
                type="text"
                label="Power"
                value={values.power}
                placeholder="Power"
                touched={touched.power}
                error={errors?.power}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Textfield
                id="description"
                name="description"
                type="text"
                label="Description"
                value={values.description}
                placeholder="Description"
                touched={touched.description}
                error={errors?.description}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Textfield
                id="available"
                name="available"
                type="text"
                label="Available"
                value={values.available}
                placeholder="Available"
                touched={touched.available}
                error={errors?.available}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Textfield
                id="discount"
                name="discount"
                type="text"
                label="Discount"
                value={values.discount}
                placeholder="Discount"
                touched={touched.discount}
                error={errors?.discount}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Textfield
                id="image"
                name="image"
                type="text"
                label="Image"
                value={values.image}
                placeholder="Image"
                touched={touched.image}
                error={errors?.image}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Button label="Add Product" />
            </FormStyled>
          </>
        </Card>
      </Modal>
    </HomeStyled>
  );
};

export default Home;
