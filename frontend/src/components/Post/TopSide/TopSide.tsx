import { styled } from "@mui/material";

const Container = styled('ul')(() => ({
  display: 'flex',
}));

type Props = {
  children: React.ReactNode
}

const TopSide = ({ children }: Props) => {
  return (
    <Container>
     {children}
    </Container>
  )
}

export default TopSide