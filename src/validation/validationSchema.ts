import * as Yup from "yup";

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
