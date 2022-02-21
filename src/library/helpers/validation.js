import * as Yup from "yup";
import messages from "@iso/config/translation/locales/ja_JP.json";

Yup.setLocale({
  mixed: {
    default: messages["form.error.mixed.default"],
    required: messages["form.error.mixed.required"],
    oneOf: messages["form.error.mixed.oneOf"],
    notOneOf: messages["form.error.mixed.notOneOf"],
    defined: messages["form.error.mixed.defined"],
  },
  string: {
    length: messages["form.error.string.length"],
    min: messages["form.error.string.min"],
    max: messages["form.error.string.max"],
    matches: messages["form.error.string.matches"],
    email: messages["form.error.string.email"],
    url: messages["form.error.string.url"],
    trim: messages["form.error.string.trim"],
    lowercase: messages["form.error.string.lowercase"],
    uppercase: messages["form.error.string.uppercase"],
  },
  number: {
    min: messages["form.error.number.min"],
    max: messages["form.error.number.max"],
    lessThan: messages["form.error.number.lessThan"],
    moreThan: messages["form.error.number.moreThan"],
    notEqual: messages["form.error.number.notEqual"],
    positive: messages["form.error.number.positive"],
    negative: messages["form.error.number.negative"],
    integer: messages["form.error.number.integer"],
  },
  date: {
    min: messages["form.error.date.min"],
    max: messages["form.error.date.max"],
  },
  object: {
    noUnknown: messages["form.error.object.noUnknown"],
  },
  array: {
    min: messages["form.error.array.min"],
    max: messages["form.error.array.max"],
  },
});

export default Yup;
