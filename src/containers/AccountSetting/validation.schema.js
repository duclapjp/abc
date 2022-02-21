import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    mail: Yup.string()
      .trim()
      .email()
      .max(500)
      .label(messages["page.Account.emailAddress"]),
    password: Yup.string()
      .min(6)
      .max(12)
      .label(messages["page.Account.newPassword"]),
    newPassword: Yup.string().when("password", {
      is: (value) => !!(value && value.length),
      then: Yup.string()
        .min(6)
        .max(12)
        .required()
        .oneOf(
          [Yup.ref("password"), null],
          messages["form.error.mixed.oneOf.rePassword"]
        )
        .label(messages["page.Account.reNewPassword"]),
      otherwise: Yup.string()
        .min(6)
        .max(12)
        .label(messages["page.Account.reNewPassword"])
        .notRequired(),
    }),
    displayName: Yup.string()
      .trim()
      .required()
      .label(messages["page.Account.displayName"]),
    phone: Yup.string()
      .trim()
      .matches(/^\d+$/, {
        message: messages["page.Account.form.error.phoneIsNotValid"],
        excludeEmptyString: true,
      })
      .max(11)
      .min(10)
      .nullable(true)
      .label(messages["page.Account.phoneNumber"]),
    notiDest: Yup.string()
      .trim()
      .label(messages["page.Account.noticeFirst"])
      .nullable(true),
    mailSetting: Yup.string()
      .trim()
      .email()
      .label(messages["page.Account.emailAddress"])
      .nullable(true),
    slackSetting: Yup.string()
      .trim()
      .label(messages["page.Account.slack"])
      .nullable(true),
    chatworkSetting: Yup.string()
      .trim()
      .label(messages["page.Account.chat"])
      .nullable(true),
    lineSetting: Yup.string()
      .trim()
      .label(messages["page.Account.line"])
      .nullable(true),
    viberRakutenSetting: Yup.string()
      .trim()
      .label(messages["page.Account.rakutenViber"])
      .nullable(true),
  });

export default validationSchema;
