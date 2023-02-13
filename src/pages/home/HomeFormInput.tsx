import { useState } from "react";
import { useFormik } from "formik";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { validationSchema } from "@/validation/validationSchema";
import { Button } from "@/components/button";
import Card from "@/components/card";
import { NotificationToast } from "@/components/notificationToast";
import Textfield, {
  LabelStyled,
  SpanErrorStyled,
} from "@/components/textField";
import { ProductProps } from "@/models/product";
import { productsCollectionRef } from "@/config/firebase-config";
import { createProvisionalId } from "@/utilities/utilitiesFunctions";
import Switch from "@mui/material/Switch";
import { InputFiles } from "@/components/inputFiles";
import {
  FormBoxImgs,
  FormStyled,
  ImageFormEmpty,
  ImageFormSelected,
  SwitchBoxStyled,
} from "./home.styled";
import { useSetDataFirebase } from "@/hooks/setData/use-set-data";
import { TitleStyled } from "@/components/title";
import { InputFilesImageProps } from "@/models/form";

const initialValues: ProductProps = {
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
};

interface HomeFormInputProps {
  getData: (collection: CollectionReference<DocumentData>) => Promise<void>;
}

const HomeFormInput = ({ getData }: HomeFormInputProps) => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [emptyFileInputError, setEmptyFileInputError] = useState(false);
  const [inputFilesImage, setInputFilesImage] = useState<InputFilesImageProps>({
    objectURL: "",
    file: new Uint8Array([0, 0, 0, 0, 0]),
  });
  const [setDocToDB, loadingSetDocToDB, isError] = useSetDataFirebase();

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: async (values: ProductProps) => {
        if (inputFilesImage.objectURL === "") {
          setEmptyFileInputError(true);
          return;
        }
        /*  const imageObj = new Map<string, string>( [
          ['id', ''],
          ['name', ''],
          ['route', ''],
        ]); */

        /*  imageObj.set("id", `bulb-${cloneOfName}-${createProvisionalId()}`);
        imageObj.set("name", values.name);
        imageObj.set("route", ""); */
        const cloneOfProduct = structuredClone(values);
        const cloneOfName = cloneOfProduct.name.replaceAll(" ", "-");

        await setDocToDB(
          productsCollectionRef,
          {
            internalCode: values.internalCode,
            name: values.name,
            price: values.price,
            power: values.power,
            description: values.description,
            available: values.available,
            discount: values.discount,
            image: {
              id: `bulb-${cloneOfName}-${createProvisionalId()}`,
              name: values.name,
              route: "",
            }, ///// arreglar esto, esta vacio, no deberia ser así
          },
          inputFilesImage.file
        );

        getData(productsCollectionRef);
        setIsToastActive(true);
      },
      validationSchema,
    });

  const handleOnChangeInputFiles = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const uploadImg: InputFilesImageProps = {
        objectURL: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };

      setInputFilesImage(uploadImg);
      setEmptyFileInputError(false);
    }
  };

  return (
    <Card>
      <>
        <TitleStyled>Add products</TitleStyled>
        <FormStyled onSubmit={handleSubmit} aria-label="form">
          <FormBoxImgs>
            <InputFiles
              id="user-files"
              name="image"
              value={values.image.name}
              placeholder="Select Image"
              touched={touched.image?.name}
              error={errors?.image?.name}
              onBlur={handleBlur}
              onChange={handleOnChangeInputFiles}
            />
            {inputFilesImage.objectURL === "" ? (
              <ImageFormEmpty error={emptyFileInputError}>
                <img src="./img/icon-add-files.png" alt="Select image" />
              </ImageFormEmpty>
            ) : (
              <ImageFormSelected>
                <img src={inputFilesImage.objectURL} alt="Select image" />
              </ImageFormSelected>
            )}
            {emptyFileInputError && (
              <SpanErrorStyled> Image field is required </SpanErrorStyled>
            )}
          </FormBoxImgs>

          <SwitchBoxStyled>
            <LabelStyled>Available</LabelStyled>

            <Switch
              name="available"
              checked={values.available}
              size="medium"
              value={values.available}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <span>
              {values.available
                ? "Producto disponible"
                : "Producto no disponible"}
            </span>
            {errors?.available && (
              <SpanErrorStyled> Available field is required </SpanErrorStyled>
            )}
          </SwitchBoxStyled>

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

          {loadingSetDocToDB === false && <Button label="Add Product" />}
          {loadingSetDocToDB && <Button btnLoader={true} disabled={true} />}
          <NotificationToast
            title="Producto creado correctamente"
            isToastActive={isToastActive}
            errorTitle="Error subiendo producto"
            isErrorActive={isError}
            setIsToastActive={setIsToastActive}
          />
        </FormStyled>
      </>
    </Card>
  );
};

export default HomeFormInput;
