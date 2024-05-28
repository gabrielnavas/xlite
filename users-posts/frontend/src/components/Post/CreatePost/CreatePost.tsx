import { Paper, styled } from "@mui/material";

import LeftSide from "../LeftSide/LeftSide";
import CreatePostRightSide from "./CreatePostRightSide";

type Props = {
  user: {
    avatarUrl: string
    createPostOnClick: (description: string) => void
  },
}

const Container = styled(Paper)(({ theme }) => ({
  display: 'flex',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
  margin: '1rem 0 2rem 0',
  [theme.breakpoints.down('md')]: {
    width: '32rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '21rem',
  },
}));


const CreatePost = ({ user }: Props) => {
  return (
    <Container >
      <LeftSide avatarUrl={user.avatarUrl} />
      <CreatePostRightSide createPostOnClick={user.createPostOnClick} />
    </Container>
  )
}

export default CreatePost;