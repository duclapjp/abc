import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) => {
  return Yup.object().shape({
    otaTypeId: Yup.string()
      .nullable()
      .required()
      .label(messages["page.otaList.th.type"]),
    name: Yup.string()
      .trim()
      .nullable()
      .required()
      .label(messages["page.otaList.th.serviceName"]),
    loginUrlFixed1: Yup.string()
      .nullable()
      .required()
      .label(messages["page.otaDetail.loginUrl"]),
    // loginId: Yup.string()
    //   .nullable()
    //   .required()
    //   .label(messages["page.otaDetail.loginID"]),
    // password: Yup.string()
    //   .nullable()
    //   .required()
    //   .label(messages["page.storeAddEditEmail.password"]),
  });
};

export default validationSchema;
