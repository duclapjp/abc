import Yup from "@iso/lib/helpers/validation";
import { ROLES } from "@iso/constants/common.constant";

const validationSchema = (messages, role, accountId) => {
  let shapeObject = {};
  if (role === ROLES.ADMIN) {
    shapeObject = {
      chainId: Yup.number()
        .nullable()
        .when("role", {
          is: (val) => val === ROLES.CHAIN || val === ROLES.STORE,
          then: Yup.number().nullable().label(messages["page.Account.chain"]),
          otherwise: Yup.number().notRequired(),
        }),
      storeId: Yup.number()
        .nullable()
        .when("role", {
          is: (val) => val === ROLES.STORE,
          then: Yup.number()
            .nullable()
            .required()
            .label(messages["page.Account.store"]),
          otherwise: Yup.number().notRequired(),
        }),
      status: Yup.string()
        .nullable()
        .required()
        .label(messages["page.Account.status"]),
      mail: Yup.string()
        .trim()
        .email()
        .label(messages["page.mailAddress"])
        .nullable()
        .required(),
    };
  }
  if (role === ROLES.CHAIN) {
    shapeObject = {
      storeId: Yup.number()
        .nullable()
        .when("role", {
          is: (val) => val === ROLES.STORE,
          then: Yup.number()
            .nullable()
            .required()
            .label(messages["page.Account.store"]),
          otherwise: Yup.number().notRequired(),
        }),
    };
  }
  if (role === ROLES.CHAIN || role === ROLES.STORE) {
    !accountId &&
      (shapeObject = {
        mail: Yup.string()
          .trim()
          .email()
          .label(messages["page.mailAddress"])
          .nullable()
          .required(),
      });
  }
  return Yup.object().shape({
    role: Yup.string().nullable().required().label(messages["page.Account.role"]),
    displayName: Yup.string()
      .nullable()
      .trim()
      .required()
      .label(messages["page.Account.username"]),
    note: Yup.string().nullable().trim(),
    phone: Yup.string()
      .trim()
      .nullable()
      .matches(/^\d+$/, {
        message: messages["page.Account.form.error.phoneIsNotValid"],
        excludeEmptyString: true,
      })
      .max(11)
      .min(10)
      .label(messages["page.Account.phoneNumber"]),
    ...shapeObject,
  });
};

export default validationSchema;
