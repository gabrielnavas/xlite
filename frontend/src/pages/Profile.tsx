import { useEffect } from "react";

import { Container, styled } from "@mui/material";

import localAuthManager from "../services/LocalAuthManager";
import { useNavigate, useParams } from "react-router-dom";
import { routePaths } from "../Router";
import Left from "../components/Left/Left";
import Sidebar from "../components/Sidebar/Sidebar";
import Right from "../components/Right/Right";
import TimelineProfile from "../components/TimelineProfile/TimelineProfile";


const Page = styled(Container)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: 0
  },
}));


const Profile = () => {
  const navigate = useNavigate()
  const params = useParams<{ username: string }>();

  console.log(params)

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
        <TimelineProfile />
      </Right>
    </Page>
  )
}

export default Profile;
