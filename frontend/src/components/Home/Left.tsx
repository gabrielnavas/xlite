import { styled } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const Container = styled('div')(({ theme }) => ({
  width: '15%',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '8%',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '3%',
    paddingRight: '20px'
  },
}));

const Left = () => {
  return (
    <Container>
      <Sidebar />
    </Container>
  )
}

export default Left;