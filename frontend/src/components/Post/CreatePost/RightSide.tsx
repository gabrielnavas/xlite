import { styled } from "@mui/material";
import Form from "./Form";

const Container = styled('section')(() => ({
  width: '100%'
}));

type Props = {
  user: {
    avatarUrl: string
    createPostOnClick: (description: string) => void
  },
}

const RightSide = ({ user }: Props) => {
  return (
    <Container>
      <Form createPostOnClick={user.createPostOnClick} />
    </Container>
  )
}

export default RightSide