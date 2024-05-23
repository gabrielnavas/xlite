import { Button, TextField } from "@mui/material";

import { useFormik } from "formik";

import * as Yup from 'yup';

type RegisterForm = {
  fullname: string
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

const RegisterForm = () => {
  const validationSchema = Yup.object<RegisterForm>({
    fullname: Yup
      .string()
      .required('Full name is required')
      .min(2, 'Full name should be of minimum 2 characters length')
      .max(100, 'Full name should be of maximum 255 characters length'),
    username: Yup
      .string()
      .required('Username is required')
      .min(2, 'Username should be of minimum 2 characters length')
      .max(100, 'Username should be of maximum 255 characters length'),
    email: Yup
      .string()
      .email()
      .required('Email is required')
      .min(2, 'Email should be of minimum 2 characters length')
      .max(100, 'Email should be of maximum 255 characters length'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), ""], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: RegisterForm, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
       <TextField
        fullWidth
        id="fullname"
        name="fullname"
        label="Fullname"
        margin="normal"
        value={formik.values.fullname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
        helperText={formik.touched.fullname && formik.errors.fullname}
      />
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        margin="normal"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        margin="normal"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        margin="normal"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        fullWidth
        id="passwordConfirmation"
        name="passwordConfirmation"
        label="PasswordConfirmation"
        margin="normal"
        type="password"
        value={formik.values.passwordConfirmation}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
        helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        size="small">
        Sign Up
      </Button>
    </form>
  )
}

export default RegisterForm;