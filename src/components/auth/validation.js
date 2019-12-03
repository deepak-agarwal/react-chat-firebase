import * as yup from "yup";

export const validationSchemaLogin = yup.object({
    email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(6)
    .max(12)
})

export const validationSchemaRegister = yup.object({
    username: yup
      .string()
      .required()
      .max(10)
      .min(6),
    password: yup
      .string()
      .required()
      .min(6)
      .max(12),
    email: yup
      .string()
      .email()
      .required()
  });