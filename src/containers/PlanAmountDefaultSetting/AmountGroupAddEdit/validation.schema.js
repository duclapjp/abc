import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    amountGroupName: Yup.string()
      .trim()
      .required()
      .label(messages["page.AmountGroup.groupName"]),
  });

export default validationSchema;
