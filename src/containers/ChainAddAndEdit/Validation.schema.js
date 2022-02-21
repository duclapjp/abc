import Yup from "@iso/lib/helpers/validation";

const validationSchema = (messages) =>
  Yup.object().shape({
    contractStatus: Yup.string()
      .required()
      .nullable()
      .label(messages["page.chains.contractStatus"]),
    name: Yup.string()
      .trim()
      .required()
      .nullable()
      .label(messages["page.chains.chainName"]),
    directorId1: Yup.number()
      .required()
      .nullable()
      .label(messages["page.chains.table.directorCharge1"]),
    managerMail: Yup.string()
      .required()
      .trim()
      .email()
      .nullable()
      .label(messages["page.chains.chainManagerEmail"]),
    note: Yup.string().nullable().trim().label(messages["page.chains.remarks"]),
    storeIds: Yup.array().of(
      Yup.number().nullable().label(messages["page.chains.facilityName"])
    ),
  });

export default validationSchema;
