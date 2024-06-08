import { useCallback, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {   Container, styled } from "@mui/material";

import { routePaths } from "../Router";

import TimelineHome from "../components/TimelineHome/TimelineHome";
import Sidebar from "../components/Sidebar/Sidebar";
import Left from "../components/Left/Left";
import Right from "../components/Right/Right";
import { useAppSelector } from "../store/store";

const Page = styled(Container)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: 0
  },
}));

const Home = () => {
  const navigate = useNavigate()
  const isAuth = useAppSelector(store => store.auth.isAuth)
 
  const setTitle = () => {
    document.title = "Home | Xlite";
  }

  const verifyIsAuth = useCallback(() => {
    if(!isAuth) {
      navigate(routePaths.auth.login)
    }
  }, [navigate, isAuth])

  useEffect(() => setTitle(), []);
  useEffect(() => verifyIsAuth(), [verifyIsAuth]);

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
