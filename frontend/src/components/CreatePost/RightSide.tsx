import { styled } from "@mui/material";
import Form from "./Form";

const Container = styled('section')(() => ({
  width: '80%'
}));


const RightSide = () => {
  return (
    <Container>
      <Form />
    </Container>
  )
}

export default RightSide