import * as Yup from "yup";

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Required"),
  password: Yup.string()
    .min(6, "Min length 6")
    .max(20, "Max length 20")
    .required("Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Min length 6")
    .max(20, "Max length 20")
    .required("Required"),
});

export const orderSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Required"),
  address: Yup.string()
    .max(200, "Address cannot exceed 200 characters")
    .required("Required"),
  paymentMethod: Yup.string()
    .oneOf(["Cash On Delivery", "Bank"])
    .required("Payment method is required"),
});
