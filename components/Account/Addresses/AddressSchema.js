import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const AddressSchema = Yup.object({
  fullName: Yup.string().required("Enter Name"),
  lastName: Yup.string(),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Enter Phone number"),
  city: Yup.string()
    .required("This Field can't be empty")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  line1: Yup.string().required("This Field can't be empty"),
  line2: Yup.string().required("This Field can't be empty"),
  state: Yup.string().required("Choose State"),
  type: Yup.string().required("Choose address type"),
  addressName: Yup.string("Name this address").required("Name this address"),
  zipcode: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
});

export const initialValues = {
  fullName: "",
  phoneNumber: "",
  lastName: "",
  city: "",
  line1: "",
  line2: "",
  state: "",
  type: "",
  zipcode: "",
  addressName:"",
};
