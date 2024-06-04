import { styled } from "@mui/material";

type Props = {
  children: React.ReactNode
}

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

const Right = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Right;