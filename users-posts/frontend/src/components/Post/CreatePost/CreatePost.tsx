import { Paper } from "@mui/material";

import LeftSide from "../LeftSide/LeftSide";
import CreatePostRightSide from "./CreatePostRightSide";

type Props = {
  user: {
    avatarUrl: string
    createPostOnClick: (description: string) => void
  },
}

const style = {
  display: 'flex',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
  margin: '1rem 0 2rem 0',
} as React.CSSProperties;

const CreatePost = ({ user }: Props) => {
  return (
    <Paper sx={style} >
      <LeftSide avatarUrl={user.avatarUrl} />
      <CreatePostRightSide createPostOnClick={user.createPostOnClick} />
    </Paper>
  )
}

export default CreatePost;