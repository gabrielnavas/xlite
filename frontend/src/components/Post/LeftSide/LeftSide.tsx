import { Avatar, styled } from "@mui/material";

const Container = styled('section')(({ theme }) => ({
  padding: '0.75rem 1rem 1rem 0.50rem',
  [theme.breakpoints.down('md')]: {
    padding: '0.75rem 1rem 1rem 0.25rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: '0.75rem 0.50rem 1rem 0.25rem',
  },
}));

type Props = {
  avatarUrl: string;
}

const LeftSide = ({ avatarUrl }: Props) => {
  return (
    <Container>
      <Avatar alt="Perfil image" src={avatarUrl} />
    </Container>
  )
}

export default LeftSide;