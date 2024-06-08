import { useCallback, useEffect } from "react";

import { Button, Paper, Typography, styled } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import AuthPaper from "../components/Auth/AuthPaper";
import LoginForm from "../components/Auth/Login/LoginForm";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../Router";

import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/features/authSlice";

const Page = styled(Paper)(() => ({
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
}));

const Icon = styled(LoginIcon)(() => ({
  color: '#999',
  fontWeight: 'bold',
  fontSize: '2.8rem'
}));


const LoginPage = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector(store => store.auth.isAuth)
  const dispatch = useAppDispatch()

  const setTitle = () => {
    document.title = "Login | Xlite";
  }

  const verifyIsAuth = useCallback(() => {
    if(isAuth) {
      navigate(routePaths.home)
    } else {
      dispatch(logout())
    }
  }, [navigate, isAuth, dispatch])

  useEffect(() => setTitle(), []);
  useEffect(() => verifyIsAuth(), [verifyIsAuth]);

  const bottomArea = (
    <Typography variant="h1" component="h2">
      <Button variant="outlined" onClick={() => navigate(routePaths.auth.register)}>
        I don't have an account
      </Button>
    </Typography>
  )

  return (
    <Page>
      <AuthPaper 
        title="Login" 
        icon={<Icon />} 
        bottomArea={bottomArea}>
        <LoginForm />
      </AuthPaper>
    </Page>
  )
}

export default LoginPage;