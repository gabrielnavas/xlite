import { Paper, styled } from "@mui/material";


const Container = styled(Paper)(({ theme }) => ({
  display: 'flex',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
  [theme.breakpoints.down('md')]: {
    width: '32rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '21rem',
  },
  [theme.breakpoints.down(400)]: {
    width: '18.5rem',
  },
  [theme.breakpoints.down(420)]: {
    width: '20rem',
  },
}));

type Props = {
  children: React.ReactNode
}

const PostBase = ({ children }: Props) => {
  return (
    <Container>{children}</Container>
  )
}

export default PostBase;