import { useState } from "react";
import { useFormik } from "formik";
import {
  validationSchemaLightBulbs,
  validationSchemaCables,
} from "@/validation/validationSchema";
import Textfield, {
  LabelStyled,
  SpanErrorStyled,
} from "@/components/textField";
import { useGetData } from "@/hooks/use-get-data";
import Switch from "@mui/material/Switch";
import {
  Button,
  Card,
  FormBoxImgs,
  FormStyled,
  ImageFormSelected,
  InputFiles,
  NotificationToast,
  SwitchBoxParentStyled,
  SwitchBoxStyled,
  TitleStyled,
} from "@/components";
import { useUpdateDataFirebase } from "@/hooks/updateData/use-update-data";
import { InputFilesImageProps } from "@/models/form";
import { ImagetProps } from "@/models/product";

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

interface HomeEditItemFormProps {
  productValues: SearchingHomeProductProps;
  productTypeSelected: string;
}

const EditItemForm = ({
  productValues,
  productTypeSelected,
}: HomeEditItemFormProps) => {
  const [getData] = useGetData();
  const [isToastActive, setIsToastActive] = useState(false);
  const [emptyFileInputError, setEmptyFileInputError] = useState(false);
  const [updateDocToDB, loadingUpdateDoc, isError] = useUpdateDataFirebase();
  const [inputFilesImage, setInputFilesImage] = useState<InputFilesImageProps>({
    objectURL: "",
    file: new Uint8Array([0, 0, 0, 0, 0]),
  });
  const isProductTypeSelected = productTypeSelected === "lightBulbs";

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: productValues,
      onSubmit: async (productValues) => {
        await updateDocToDB(
          productTypeSelected,
          productValues,
          inputFilesImage.file,
          inputFilesImage.objectURL === ""
        );

        getData();
        setIsToastActive(true);
      },
      validationSchema: isProductTypeSelected
        ? validationSchemaLightBulbs
        : validationSchemaCables,
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

          <SwitchBoxParentStyled>
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

            <SwitchBoxStyled>
              <LabelStyled>Published</LabelStyled>

              <Switch
                name="published"
                checked={values.published}
                size="medium"
                value={values.published}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <span>
                {values.published
                  ? "Producto publicado"
                  : "Producto no publicado"}
              </span>
              {errors?.published && (
                <SpanErrorStyled> Published field is required </SpanErrorStyled>
              )}
            </SwitchBoxStyled>
          </SwitchBoxParentStyled>

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
          {isProductTypeSelected ? (
            <Textfield
              id="power"
              name="power"
              type="text"
              label="Power"
              value={values.power ? values.power : "power"}
              placeholder="Power"
              touched={touched.power}
              error={errors?.power}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          ) : (
            <Textfield
              id="caliber"
              name="caliber"
              type="text"
              label="Caliber"
              value={values?.caliber ? values?.caliber : "caliber"}
              placeholder="Caliber"
              touched={touched.caliber}
              error={errors?.caliber}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          )}

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

export default EditItemForm;
