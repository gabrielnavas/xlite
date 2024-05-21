import { Button, TextField } from "@mui/material";

import { useFormik } from "formik";

import * as Yup from 'yup';

type RegisterForm = {
  username: string
  password: string
}

const LoginForm = () => {
  const validationSchema = Yup.object<RegisterForm>({
    username: Yup
      .string()
      .required('Username is required')
      .min(2, 'Username should be of minimum 2 characters length')
      .max(100, 'Username should be of maximum 255 characters length'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
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
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        size="small">
        Sign In
      </Button>
    </form>
  )
}

export default LoginForm;