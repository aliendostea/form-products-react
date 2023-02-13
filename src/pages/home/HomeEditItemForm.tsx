import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/button";
import Card from "@/components/card";
import { NotificationToast } from "@/components/notificationToast";
import Textfield, {
  LabelStyled,
  SpanErrorStyled,
} from "@/components/textField";
import Switch from "@mui/material/Switch";
import { useUpdateDataFirebase } from "@/hooks/updateData/use-update-data";
import { validationSchema } from "@/validation/validationSchema";
import {
  FormBoxImgs,
  FormStyled,
  ImageFormSelected,
  SwitchBoxStyled,
} from "./home.styled";
import { productsCollectionRef } from "@/config/firebase-config";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { ProductProps } from "@/models/product";
import { TitleStyled } from "@/components/title";
import { InputFilesImageProps } from "@/models/form";
import { InputFiles } from "@/components/inputFiles";

interface HomeEditItemFormProps {
  productValues: ProductProps;
  getData: (collection: CollectionReference<DocumentData>) => Promise<void>;
}

const HomeEditItemForm = ({
  productValues,
  getData,
}: HomeEditItemFormProps) => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [emptyFileInputError, setEmptyFileInputError] = useState(false);
  const [updateDocToDB, loadingUpdateDoc, isError] = useUpdateDataFirebase();
  const [inputFilesImage, setInputFilesImage] = useState<InputFilesImageProps>({
    objectURL: "",
    file: new Uint8Array([0, 0, 0, 0, 0]),
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: productValues,
      onSubmit: async (productValues) => {
        await updateDocToDB(
          productValues,
          inputFilesImage.file,
          inputFilesImage.objectURL === ""
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
        <TitleStyled>Edit products</TitleStyled>
        <FormStyled onSubmit={handleSubmit} aria-label="form">
          <FormBoxImgs>
            <InputFiles
              id="user-files"
              name="image"
              value=""
              placeholder="Select Image"
              touched={touched?.image?.name}
              error={errors?.image?.name}
              onBlur={handleBlur}
              onChange={handleOnChangeInputFiles}
            />

            {inputFilesImage.objectURL !== "" && (
              <ImageFormSelected>
                <img src={inputFilesImage.objectURL} alt="Select image" />
              </ImageFormSelected>
            )}
            {inputFilesImage.objectURL === "" && (
              <ImageFormSelected>
                <img src={values?.image.route} alt="Select image" />
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
            value={values?.name}
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
            value={values?.internalCode}
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
            value={values?.price}
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
            value={values?.power}
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
            value={values?.description}
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
            value={values?.discount}
            placeholder="Discount"
            touched={touched.discount}
            error={errors?.discount}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {loadingUpdateDoc === false && <Button label="Edit Product" />}
          {loadingUpdateDoc && <Button btnLoader={true} disabled={true} />}

          <NotificationToast
            title="Producto editado correctamente"
            isToastActive={isToastActive}
            errorTitle="Error editando producto"
            isErrorActive={isError}
            setIsToastActive={setIsToastActive}
          />
        </FormStyled>
      </>
    </Card>
  );
};

export default HomeEditItemForm;
