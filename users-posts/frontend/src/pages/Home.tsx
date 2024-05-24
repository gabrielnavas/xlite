import { useEffect } from "react";

import { Container, styled } from "@mui/material";
import Left from "../components/Home/Left";
import Right from "../components/Home/Right";


const Page = styled(Container)(() => ({
  display: 'flex',
}));


const Home = () => {
  useEffect(() => {
    document.title = "Feed | Xlite";
  }, []);

  return (
    <Page>
      <Left />
      <Right />
    </Page>
  )
}

export default Home;
