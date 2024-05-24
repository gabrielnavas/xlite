import { useEffect } from "react";

import { Button, Paper, Typography, styled } from "@mui/material";

import AuthPaper from "../components/Auth/AuthPaper";
import RegisterForm from "../components/Auth/Register/RegisterForm";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../Router";

const Page = styled(Paper)(() => ({
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
}));

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register | Xlite";
  }, []);

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
        icon={<LockOutlined />}
        bottomArea={bottomArea} >
        <RegisterForm />
      </AuthPaper>
    </Page>
  )
}

export default Register;