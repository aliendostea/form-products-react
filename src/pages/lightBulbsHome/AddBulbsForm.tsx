import { useState } from "react";
import { useFormik } from "formik";
import { createProvisionalId } from "@/utilities/utilitiesFunctions";
import {
  AddNewProductBtn,
  Button,
  Card,
  FormBoxImgs,
  FormStyled,
  ImageFormEmpty,
  ImageFormSelected,
  InputFiles,
  NotificationToast,
  SwitchBoxStyled,
  TitleStyled,
} from "@/components";
import { lightbulbsRef } from "@/config/firebase-config";
import { useSetDataFirebase } from "@/hooks/setData/use-set-data";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Textfield, {
  LabelStyled,
  SpanErrorStyled,
} from "@/components/textField";

function createNameProduct(name: string) {
  return name.replaceAll(" ", "-");
}

function createIDProduct(product: any) {
  const cloneOfProduct = structuredClone(product);
  const cloneOfName = cloneOfProduct.name.replaceAll(" ", "-");
  return `lightbulb-${cloneOfName}-${createProvisionalId()}`;
}

const INITIAL_LIGHT_BULBS_DATA2 = [
  {
    id: "BULB-new-555",
    internalCode: "",
    name: "",
    price: "",
    power: "",
    published: false,
    description: "",
    available: false,
    discount: "",
    image: {
      id: "BULB-new-555",
      name: "",
      route: "",
      file: new Uint8Array([0, 0, 0, 0, 0]),
    },
    type: "",
  },
];

const LineInputsInternalCode = styled.div`
  grid-column: 1 / -1;
  width: 112px;
  height: 1px;
  display: inline-block;
  justify-self: center;
  background-color: hsla(0, 0%, 0%, 0.11);
  margin: 2rem 0 3rem 0;
`;

const BoxBtnRemoveItems = styled.div`
  grid-column: 1 / -1;
  display: grid;
  justify-content: end;
  position: relative;

  & > button {
    width: 2.5rem;
    display: grid;
    grid-template-columns: 2.5rem;
    justify-content: center;
    align-items: center;
    justify-self: center;
    gap: 5px;
    transition: 0.45s ease-in-out;
    opacity: 1;
  }

  & > button figure {
    width: 2.2rem;
    height: 2.2rem;
    align-self: center;
    display: block;

    & > img {
      filter: grayscale(98%);
      opacity: 0.3;
      transition: 0.45s ease-in-out;
    }
  }

  & > button:hover + span {
    opacity: 1;
  }
  & > button:hover img {
    filter: grayscale(0%);
    opacity: 1;
  }
  &:hover > button {
    opacity: 1;
  }
`;

const SpanBgBtnRemoveItems = styled.span`
  height: 49.5rem;
  width: calc(100% + 10px);
  display: block;
  background: #f4f4f4;
  border-radius: 7px;
  opacity: 0;
  position: absolute;
  bottom: -467px;
  left: -6px;
  transition: 0.45s ease-in-out;
  z-index: -1;
`;

//// on progress
const GroupTextFieldsForm = ({
  values,
  indexItem,
  touched,
  errors,
  handleBlur,
  handleDeleteInputs,
  handleOnChangeInputFiles,
  inputFilesImage,
  emptyFileInputError,
  handleChange,
}: any) => {
  return (
    <>
      {indexItem > 0 && (
        <LineInputsInternalCode
          key={`LineInputsInternalCode${values.id}`}
        ></LineInputsInternalCode>
      )}

      {indexItem > 0 && (
        <BoxBtnRemoveItems key={values.id}>
          <button onClick={(e) => handleDeleteInputs(e, values)}>
            <figure>
              <img src="./img/icon-error.png" alt="Delete group" />
            </figure>
          </button>
          <SpanBgBtnRemoveItems></SpanBgBtnRemoveItems>
        </BoxBtnRemoveItems>
      )}

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
        {inputFilesImage.route === "" ? (
          <ImageFormEmpty error={emptyFileInputError}>
            <img src="./img/icon-add-files.png" alt="Select image" />
          </ImageFormEmpty>
        ) : (
          <ImageFormSelected>
            <img src={inputFilesImage.route} alt="Select image" />
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
          {values.available ? "Producto disponible" : "Producto no disponible"}
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
    </>
  );
};

interface InputFilesImageProps2 {
  id?: string;
  name: string;
  route: string;
  file: Blob | Uint8Array | ArrayBuffer;
}

const AddBulbsForm = () => {
  const [isToastActive, setIsToastActive] = useState(false);
  const [emptyFileInputError, setEmptyFileInputError] = useState(false);
  const [inputFilesImage, setInputFilesImage] = useState<
    InputFilesImageProps2[]
  >([
    {
      id: INITIAL_LIGHT_BULBS_DATA2[0].id,
      name: "",
      route: "",
      file: new Uint8Array([0, 0, 0, 0, 0]),
    },
  ]);
  const [setDocToDB, loadingSetDocToDB, isError] = useSetDataFirebase();

  const { values, setValues, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: INITIAL_LIGHT_BULBS_DATA2,
      onSubmit: async (values) => {
        if (inputFilesImage[0].route === "") {
          setEmptyFileInputError(true);
          return;
        }

        const newValuesArray = values.map((lightbulb, index) => {
          const createdID = createIDProduct(lightbulb);
          const createdName = createNameProduct(lightbulb.name);

          return {
            id: createdID,
            internalCode: lightbulb.internalCode,
            name: lightbulb.name,
            price: lightbulb.price,
            published: false,
            power: lightbulb.power,
            description: lightbulb.description,
            available: lightbulb.available,
            discount: lightbulb.discount,
            image: {
              id: createdID,
              name: createdName,
              route: inputFilesImage[index].route,
              file: inputFilesImage[index].file,
            },
            type: "lightBulbs",
            associatedProducts: [],
          };
        });

        const associatedProducts = newValuesArray.filter(
          (item, index) => index > 0
        );

        const newProductToSet = {
          id: newValuesArray[0].id,
          internalCode: newValuesArray[0].internalCode,
          name: newValuesArray[0].name,
          price: newValuesArray[0].price,
          published: newValuesArray[0].published,
          power: newValuesArray[0].power,
          description: newValuesArray[0].description,
          available: newValuesArray[0].available,
          discount: newValuesArray[0].discount,
          image: {
            id: newValuesArray[0].image.id,
            name: newValuesArray[0].image.name,
            route: newValuesArray[0].image.route,
            file: newValuesArray[0].image.file,
          },
          type: "lightBulbs",
          associatedProducts: [...associatedProducts],
        };

        await setDocToDB(
          "lightBulbs",
          lightbulbsRef,
          newProductToSet,
          inputFilesImage
        );

        setIsToastActive(true);
      },
    });

  const handleOnChangeInputFiles = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    id: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const uploadImg = {
        id,
        name: "",
        route: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };

      const arrayUploadImgs = structuredClone(inputFilesImage);
      arrayUploadImgs[index] = uploadImg;

      setInputFilesImage(arrayUploadImgs);
      setEmptyFileInputError(false);
    }
  };

  const getBooleanValue = (value: string | boolean): boolean => {
    if (value === "false") return true;

    if (value === "true") return false;

    if (value) return false;

    return false;
  };

  const addNewFilesToArray = (id: string) => {
    const arrayUploadImgs = structuredClone(inputFilesImage);

    setInputFilesImage([
      ...arrayUploadImgs,
      {
        id,
        name: "",
        route: "",
        file: new Uint8Array([0, 0, 0, 0, 0]),
      },
    ]);
  };

  const handleOnChange2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    objValues: any
  ) => {
    const allValuesClone = structuredClone(values);
    const valueFound = allValuesClone.find((item) => {
      return item.id === objValues.id;
    });

    const valueFoundNotNullish = valueFound ?? {
      id: "BULB-new-555",
      internalCode: "",
      name: "",
      price: "",
      power: "",
      published: false,
      description: "",
      available: false,
      discount: "",
      image: {
        id: "BULB-new-555",
        name: "",
        route: "",
        file: new Uint8Array([0, 0, 0, 0, 0]),
      },
      type: "",
    };

    const index = allValuesClone.indexOf(valueFoundNotNullish);

    const targetValue =
      e.target.name === "available"
        ? getBooleanValue(e.target.value)
        : e.target.value;

    const newObjValues = {
      ...valueFoundNotNullish,
      [e.target.name]: targetValue,
    };

    allValuesClone[index] = newObjValues;

    setValues(allValuesClone);
  };

  const insertInputsValues = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const allValuesClone = structuredClone(values);
    const provisionalId = `BULB-${createProvisionalId()}`;

    const newObjValues = {
      id: provisionalId,
      internalCode: "",
      name: "",
      price: "",
      power: "",
      published: false,
      description: "",
      available: true,
      discount: "",
      image: {
        id: provisionalId,
        name: "",
        route: "",
        file: new Uint8Array([0, 0, 0, 0, 0]),
      },
      type: "",
    };

    addNewFilesToArray(provisionalId);
    setValues([...allValuesClone, newObjValues]);
  };

  const handleDeleteInputs = (e: any, element: any) => {
    e.preventDefault();
    e.stopPropagation();

    const allValuesClone = structuredClone(values);
    const valuesFiltered = allValuesClone.filter(
      (item) => item.id !== element.id
    );
    const arrayUploadImgs = inputFilesImage.filter(
      (item) => item.id !== element.id
    );

    setInputFilesImage([...arrayUploadImgs]);
    setValues([...valuesFiltered]);
  };

  return (
    <Card>
      <>
        <TitleStyled>Add products</TitleStyled>
        <FormStyled onSubmit={handleSubmit} aria-label="form">
          {values.map((element, index) => {
            return (
              <GroupTextFieldsForm
                key={element.id}
                indexItem={index}
                values={element}
                touched={touched}
                handleBlur={handleBlur}
                handleDeleteInputs={handleDeleteInputs}
                handleOnChangeInputFiles={(e: any) =>
                  handleOnChangeInputFiles(e, index, element.id)
                }
                inputFilesImage={inputFilesImage[index]}
                emptyFileInputError={emptyFileInputError}
                handleChange={(e: any) => handleOnChange2(e, values[index])}
                errors={errors}
              />
            );
          })}

          {values.length < 5 && (
            <AddNewProductBtn
              bg="white"
              margin="4rem 0 5rem 0"
              onClick={insertInputsValues}
            >
              <AddIcon />
              <span>New model</span>
            </AddNewProductBtn>
          )}

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

export default AddBulbsForm;
