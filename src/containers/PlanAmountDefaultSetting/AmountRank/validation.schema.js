import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) => {
  return Yup.object().shape({
    amountRanks: Yup.array().of(
      Yup.object().shape({
        amountRankName: Yup.string()
          .trim()
          .nullable()
          .required()
          .label(messages["page.planAmountDefaults.th.amountRankName"]),
      })
    ),
  });
};

export default validationSchema;
