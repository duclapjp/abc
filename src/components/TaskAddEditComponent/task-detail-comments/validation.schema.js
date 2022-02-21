import Yup from "@iso/lib/helpers/validation";

const validationSchema = () => {
  return Yup.object().shape({
    // commentText: Yup.string()
    //   .trim()
    //   .nullable()
    //   .required()
    //   .label(messages["page.taskEdit.commentText"]),
  });
};

export default validationSchema;
