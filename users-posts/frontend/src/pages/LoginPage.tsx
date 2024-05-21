import { useEffect } from "react";

import { Button, Paper, Typography, styled } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

import AuthPaper from "../components/Auth/AuthPaper";
import LoginForm from "../components/Auth/Login/LoginForm";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../routes";

const Page = styled(Paper)(() => ({
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
}));

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Xlite";
  }, []);

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
        icon={<LoginOutlined />} 
        bottomArea={bottomArea}>
        <LoginForm />
      </AuthPaper>
    </Page>
  )
}

export default LoginPage;