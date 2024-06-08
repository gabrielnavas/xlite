import { useCallback, useEffect } from "react";

import { Button, Paper, Typography, styled } from "@mui/material";

import AuthPaper from "../components/Auth/AuthPaper";
import RegisterForm from "../components/Auth/Register/RegisterForm";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../Router";
import { useAppSelector } from "../store/store";

const Page = styled(Paper)(() => ({
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
}));

const Icon = styled(LockOutlined)(() => ({
  color: '#999',
  fontWeight: 'bold',
  fontSize: '2.8rem'
}));


const Register = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(store => store.auth.isAuth)

  const setTitle = () => {
    document.title = "Register | Xlite";
  }

  const verifyIsAuth = useCallback(() => {
    if(isAuth) {
      navigate(routePaths.home)
    }
  }, [navigate, isAuth])

  useEffect(() => setTitle(), []);
  useEffect(() => verifyIsAuth(), [verifyIsAuth]);

  const bottomArea = (
    <Typography variant="h1" component="h2">
    <Button fullWidth variant="outlined" onClick={() => navigate(routePaths.auth.login)}>
        already have an account
      </Button>
    </Typography>
  )

  return (
    <Page>
      <AuthPaper
        title="Register"
        icon={<Icon />}
        bottomArea={bottomArea} >
        <RegisterForm />
      </AuthPaper>
    </Page>
  )
}

export default Register;