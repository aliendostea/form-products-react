import * as Yup from "yup";

export const validationSchemaLightBulbs = Yup.array().of(
  Yup.object({
    name: Yup.string().min(3, "Must be 15 characters or less").required(),
    internalCode: Yup.string().min(3).required(),
    price: Yup.string().min(3).required(),
    power: Yup.string().required(),
    description: Yup.string().required(),
    available: Yup.bool().oneOf([true, false], "Field must be checked"),
    published: Yup.bool().oneOf([true, false], "Field must be checked"),
    discount: Yup.string().required(),
    image: Yup.mixed(),
  })
);

/* export const validationSchemaLightBulbs = Yup.object({
  validation: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().min(3, "Must be 15 characters or less").required(),
      internalCode: Yup.string().min(3).required(),
      price: Yup.string().min(3).required(),
      power: Yup.string().required(),
      description: Yup.string().required(),
      available: Yup.bool().oneOf([true, false], "Field must be checked"),
      published: Yup.bool().oneOf([true, false], "Field must be checked"),
      discount: Yup.string().required(),
      image: Yup.mixed(),
    })
  ),
}); */

export const validationSchemaLightBulbs2 = Yup.object({
  name: Yup.string().min(3, "Must be 15 characters or less").required(),
  internalCode: Yup.string().min(3).required(),
  price: Yup.string().min(3).required(),
  power: Yup.string().required(),
  description: Yup.string().required(),
  available: Yup.bool().oneOf([true, false], "Field must be checked"),
  published: Yup.bool().oneOf([true, false], "Field must be checked"),
  discount: Yup.string().required(),
  image: Yup.mixed(),
});

export const validationSchemaCables = Yup.object({
  name: Yup.string().min(3, "Must be 15 characters or less").required(),
  internalCode: Yup.string().min(3).required(),
  price: Yup.string().min(3).required(),
  caliber: Yup.string().required(),
  description: Yup.string().required(),
  available: Yup.bool().oneOf([true, false], "Field must be checked"),
  published: Yup.bool().oneOf([true, false], "Field must be checked"),
  discount: Yup.string().required(),
  image: Yup.mixed(),
});
