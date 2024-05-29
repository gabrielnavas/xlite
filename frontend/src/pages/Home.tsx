import { useEffect } from "react";

import { Container, styled } from "@mui/material";
import Left from "../components/Home/Left";
import Right from "../components/Home/Right";
import localAuthManager from "../services/LocalAuthManager";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../Router";


const Page = styled(Container)(({theme}) => ({
  display: 'flex',
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: 0
  },
}));


const Home = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    document.title = "Feed | Xlite";
  }, []);

  useEffect(() => {
    if(!localAuthManager().isAuth()) {
      navigate(routePaths.auth.login)
    }
    document.title = "Feed | Xlite";
  }, [navigate]);

  return (
    <Page>
      <Left />
      <Right />
    </Page>
  )
}

export default Home;
