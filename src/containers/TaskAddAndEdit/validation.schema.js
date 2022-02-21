import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) => {
  return Yup.object().shape({
    categoryId: Yup.number()
      .nullable()
      .required()
      .label(messages["page.taskAddEdit.category"]),
    title: Yup.string()
      .trim()
      .nullable()
      .required()
      .label(messages["page.taskAddEdit.title"]),
    storeIds: Yup.array()
      .strict(true)
      .nullable()
      .when("visible", {
        is: (val) => val === true,
        then: Yup.array()
          .strict(true)
          .nullable()
          .required()
          .label(messages["page.taskAddEdit.store"]),
        otherwise: Yup.array().notRequired(),
      }),
  });
};

export default validationSchema;
