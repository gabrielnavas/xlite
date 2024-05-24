import { styled } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const Container = styled('div')(() => ({
  width: '20%',
  position: 'relative'
}));

const Left = () => {
  return (
    <Container>
      <Sidebar />
    </Container>
  )
}

export default Left;