import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) => {
  return Yup.object().shape({
    contractStatus: Yup.string()
      .nullable()
      .required()
      .label(messages["page.storeAddEditEmail.contractStatus"]),
    directorId: Yup.string()
      .nullable()
      .required()
      .label(messages["page.storeAddEditEmail.director"]),
    name: Yup.string()
      .trim()
      .nullable()
      .required()
      .label(messages["page.storeAddEditEmail.storeName"]),
    managerName: Yup.string()
      .trim()
      .nullable()
      .required()
      .label(messages["page.storeAddEditEmail.managerName"]),
    managerPhone: Yup.string()
      .nullable()
      .trim()
      .matches(/^\d+$/, {
        message: messages["page.Account.form.error.phoneIsNotValid"],
        excludeEmptyString: true,
      })
      .max(11)
      .min(10)
      .required()
      .label(messages["page.storeAddEditEmail.managerPhone"]),
    managerMail: Yup.string()
      .nullable()
      .trim()
      .email()
      .required()
      .label(messages["page.mailAddress"]),
    siteControllers: Yup.array().of(
      Yup.object().shape({
        siteControllerId: Yup.number()
          .nullable()
          .required()
          .label(messages["page.storeAddEditEmail.siteController"]),
      })
    ),
    // otas: Yup.array().of(
    //   Yup.object().shape({
    //     otaId: Yup.number()
    //       .nullable()
    //       .required()
    //       .label(messages["page.storeAddEditEmail.ota"]),
    //   })
    // ),
  });
};

export default validationSchema;
