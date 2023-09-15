
import * as yup from 'yup'

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("name is missing")
    .min(3, "Name is too short!")
    .max(20, "Name is too long"),
  email: yup.string().email("Invalid email").required("Email is missing"),
  password: yup
    .string()
    .trim()
    .required("Password is missing")
    .min(8, "password is too short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!"
    ),
});
