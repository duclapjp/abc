import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .required()
      .label(messages["page.Chain.Name"])
      .nullable(),
    managerPhone: Yup.string()
      .trim()
      .nullable()
      .matches(/^\d+$/, {
        message: messages["page.Account.form.error.phoneIsNotValid"],
        excludeEmptyString: true,
      })
      .length(10)
      .label(messages["page.Chain.Phone"]),
    managerName: Yup.string()
      .trim()
      .label(messages["page.Chain.Contact"])
      .nullable(),
    managerMail: Yup.string()
      .trim()
      .email()
      .label(messages["page.Chain.Mail"])
      .nullable(),
  });

export default validationSchema;
