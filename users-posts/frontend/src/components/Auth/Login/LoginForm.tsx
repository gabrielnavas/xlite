import { Alert, AlertColor, Button, Snackbar, TextField, useMediaQuery } from "@mui/material";

import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from 'yup';

import remoteLogin from "../../../services/RemoteLogin";
import localAuthManager from "../../../services/LocalAuthManager";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../Router";

type LoginFormik = {
  email: string
  password: string
}

const LoginForm = () => {
  const [snack, setSnack] = useState({open: false, message: '', severity: ''});

  const navigate = useNavigate();

  const xs = useMediaQuery('(max-width:600px)');

  const validationSchema = Yup.object<LoginFormik>({
    email: Yup
      .string()
      .email()
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: LoginFormik, { resetForm }) => {
      try {
        const result = await remoteLogin(values.email, values.password)
        if (!result.success) {
          setSnack({message: result.message, open: true, severity: 'warning'})
        } else {
          if(result.body) {
            localAuthManager().setToken(result.body.token)
            setSnack({message: result.message, open: true, severity: 'success'})
            setTimeout(() => navigate(routePaths.home), 2000)
            resetForm();
          } else {
            setSnack({message: 'Try again later', open: true, severity: 'warning'})
          }
        }
      }
      catch(ex) {
        setSnack({message: 'Try again later', open: true, severity: 'warning'})
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
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        size={xs ? 'small' : 'medium'}>
        Sign In
      </Button>

      <Snackbar
        open={snack.open}
        onClose={() => setSnack({open: false, message: '', severity: ''})}
        autoHideDuration={5000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert severity={snack.severity as AlertColor} sx={{ width: '100%' }}>
          <span style={{ fontSize:'1.1rem' }}>{snack.message}</span>
        </Alert>
      </Snackbar>
    </form>
  )
}

export default LoginForm;