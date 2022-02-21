import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .trim()
      .required()
      .label(messages["page.forgetPassMailAddress"]),
  });

export default validationSchema;
