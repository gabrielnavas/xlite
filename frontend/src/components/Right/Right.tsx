import { styled } from "@mui/material";

type Props = {
  children: React.ReactNode
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '85%',
  [theme.breakpoints.down('md')]: {
    width: '92%',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '97%',
  },
}));

const Right = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Right;