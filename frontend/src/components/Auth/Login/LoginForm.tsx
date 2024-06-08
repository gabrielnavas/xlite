import { Alert, AlertColor, Button, Snackbar, TextField, useMediaQuery } from "@mui/material";

import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from 'yup';

import remoteLogin from "../../../services/auth/RemoteLogin";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { routePaths } from "../../../Router";
import { login } from "../../../store/features/authSlice";
import { setUser } from "../../../store/features/userSlice";

import RefreshIcon from "@mui/icons-material/Refresh";
import LoginIcon from "@mui/icons-material/Login";
import { failedMessage, remoteFinish, remoteRequest, successMessage, warningMessage } from "../../../store/features/remoteRequestSlice";

type LoginFormik = {
  email: string
  password: string
}

const validationSchema = Yup.object<LoginFormik>({
  email: Yup
    .string()
    .email()
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const [snack, setSnack] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(store => store.remoteRequest.isLoading)
  const xs = useMediaQuery('(max-width:600px)');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: LoginFormik, { resetForm }) => {
      try {
        dispatch(remoteRequest())
        const result = await remoteLogin(values.email, values.password)
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
        dispatch(failedMessage({
          message: 'try again later'
        }))
      } finally {
        dispatch(remoteFinish())
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="E-mail"
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
      <Button
        disabled={isLoading}
        startIcon={isLoading ? <RefreshIcon /> : <LoginIcon />}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        size={xs ? 'small' : 'medium'}>
        Sign In
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

export default LoginForm;