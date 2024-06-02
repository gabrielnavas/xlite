import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {   Container, styled } from "@mui/material";

import { routePaths } from "../Router";

import localAuthManager from "../services/LocalAuthManager";
import TimelineHome from "../components/TimelineHome/TimelineHome";
import Sidebar from "../components/Sidebar/Sidebar";
import Left from "../components/Left/Left";
import Right from "../components/Right/Right";

const Page = styled(Container)(({ theme }) => ({
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
    if (!localAuthManager().isAuth()) {
      navigate(routePaths.auth.login)
    }
  }, [navigate]);

  return (
    <Page>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        <TimelineHome />
      </Right>
    </Page>
  )
}

export default Home;
