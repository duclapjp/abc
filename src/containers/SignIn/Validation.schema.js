import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .trim()
      .required()
      .label(messages["page.mailAddress"]),
    password: Yup.string()
      .trim()
      .min(6)
      .max(12)
      .required()
      .label(messages["page.password"]),
  });

export default validationSchema;
