import { useState } from "react";

import { Alert, AlertColor, Button, Snackbar, TextField, useMediaQuery } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from 'yup';

import remoteRegister from "../../../services/auth/RemoteRegister";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../Router";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { LockOutlined, Refresh } from "@mui/icons-material";
import { setUser } from "../../../store/features/userSlice";
import { login } from "../../../store/features/authSlice";
import { remoteFinish, remoteRequest, successMessage, warningMessage } from "../../../store/features/remoteRequestSlice";

type RegisterForm = {
  fullName: string
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

const validationSchema = Yup.object<RegisterForm>({
  fullName: Yup
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

const RegisterForm = () => {
  const [snack, setSnack] = useState({ open: false, message: '', severity: '' });

  const xs = useMediaQuery('(max-width:600px)');

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(store => store.remoteRequest.isLoading)

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: RegisterForm, { resetForm }) => {
      try {
        dispatch(remoteRequest())
        const result = await remoteRegister(
          values.fullName,
          values.username,
          values.email,
          values.password,
          values.passwordConfirmation
        )
        if (!result.success || !result.body) {
          dispatch(warningMessage({
            message: result.message
          }))
        } else {
          dispatch(login({ token: result.body.token }))
          dispatch(setUser({ user: result.body.user }))
          dispatch(successMessage({ message: result.message }))
          navigate(routePaths.home)
          resetForm();
        }
      }
      catch (ex) {
        setSnack({ message: 'Try again later', open: true, severity: 'warning' })
      } finally {
        dispatch(remoteFinish())
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="fullName"
        name="fullName"
        label="Full name"
        margin="normal"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
        size={xs ? 'small' : 'medium'}
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
        size={xs ? 'small' : 'medium'}
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
        size={xs ? 'small' : 'medium'}
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
        size={xs ? 'small' : 'medium'}
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
        size={xs ? 'small' : 'medium'}
      />


      <Button
        disabled={isLoading}
        endIcon={isLoading ? <Refresh /> : <LockOutlined />}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        size={xs ? 'small' : 'medium'}>
        Sign Up
      </Button>

      <Snackbar
        open={snack.open}
        onClose={() => setSnack({ open: false, message: '', severity: '' })}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert severity={snack.severity as AlertColor} sx={{ width: '100%' }}>
          <span style={{ fontSize: '1.1rem' }}>{snack.message}</span>
        </Alert>
      </Snackbar>
    </form>
  )
}

export default RegisterForm;