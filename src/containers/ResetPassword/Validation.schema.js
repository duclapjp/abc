import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    password: Yup.string()
      .min(6)
      .max(12)
      .trim()
      .required()
      .label(messages["page.resetPass.password"]),
    rePassword: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("password"), null],
        messages["form.error.mixed.oneOf.rePassword"]
      )
      .label(messages["page.resetPass.rePassword"]),
  });

export default validationSchema;
