import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .required()
      .label(messages["page.Account.emailAddress"]),
    mail: Yup.string()
      .email()
      .required()
      .label(messages["page.Account.emailAddress"]),
    password: Yup.string()
      .min(6)
      .max(12)
      .required()
      .label(messages["page.resetPass.password"]),
    rePassword: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("password"), null],
        messages["form.error.mixed.oneOf.rePassword"]
      )
      .label(messages["page.resetPass.rePassword"]),
    displayName: Yup.string()
      .trim(messages["form.error.string.trimSpace"])
      .strict(true)
      .required()
      .label(messages["page.Account.displayName"]),
    noticeFirst: Yup.string().required().label(messages["page.Account.noticeFirst"]),
    phone: Yup.string().required().label(messages["page.Account.phoneNumber"]),
    slack: Yup.string().required().label(messages["page.Account.slack"]),
    chat: Yup.string().required().label(messages["page.Account.chat"]),
    line: Yup.string().required().label(messages["page.Account.line"]),
    viber: Yup.string().required().label(messages["page.Account.rakutenViber"]),
  });

export default validationSchema;
