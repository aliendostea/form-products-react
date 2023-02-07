import { useState } from "react";
import { Button } from "@/components/button";
import Card from "@/components/card";
import { NotificationToast } from "@/components/notificationToast";
import Textfield from "@/components/textField";
import { ProductProps } from "@/models/product";
import { useFormik } from "formik";
import { useAddDataFirebase } from "@/hooks/use-request-data-firestore";
import { validationSchema } from "@/validation/validationSchema";
import { FormStyled } from "./home.styled";
import { productsCollectionRef } from "@/config/firebase-config";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { createCurrencyAndPrice } from "@/utilities/utilitiesFunctions";

const initialValues: ProductProps = {
  internalCode: "",
  name: "",
  price: "",
  power: "",
  description: "",
  available: "",
  discount: "",
  image: "",
};

interface HomeFormInputProps {
  getData: (collection: CollectionReference<DocumentData>) => Promise<void>;
}

const HomeFormInput = ({ getData }: HomeFormInputProps) => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [, addDocToDB, loadingAddDocToDB] = useAddDataFirebase();

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        /* const id = createProvisionalId();
        const { price } = values;

        const newArray = [
          ...addedProducts,
          { ...values, id, price: createCurrencyAndPrice(price) },
        ];

        setAddedProducts(newArray); */

        addDocToDB(productsCollectionRef, {
          internalCode: values.internalCode,
          name: values.name,
          price: createCurrencyAndPrice(values.price),
          power: values.power,
          description: values.description,
          available: values.available,
          discount: values.discount,
          image: values.image,
        });

        getData(productsCollectionRef);
        setIsToastActive(true);
      },
      validationSchema,
    });

  return (
    <Card>
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

        {loadingAddDocToDB === false && <Button label="Add Product" />}
        {loadingAddDocToDB && <Button btnLoader={true} disabled={true} />}
        <NotificationToast
          title="Producto creado correctamente"
          isToastActive={isToastActive}
          setIsToastActive={setIsToastActive}
        />
      </FormStyled>
    </Card>
  );
};

export default HomeFormInput;
