import { styled } from "@mui/material";

const Container = styled('ul')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type Props = {
  children: React.ReactNode
}

const BottomSide = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default BottomSide;