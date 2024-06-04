import { styled } from "@mui/material";

type Props = {
  children: React.ReactNode
}

const Container = styled('div')(({ theme }) => ({
  // width: '15%',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '8%',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '3%',
    paddingRight: '20px'
  },
}));

const Left = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Left;