import { Paper } from "@mui/material";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

type Props = {
  user: {
    avatarUrl: string
    name: string;
    username: string;
  },
  post: {
    text: string;
    createdAt: Date;
  }
}

const style = {
  display: 'flex',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#FFF2',
  },
} as React.CSSProperties;


const Post = ({ user, post }: Props) => {
  return (
    <Paper sx={style}>
      <LeftSide
        avatarUrl={user.avatarUrl}
      />
      <RightSide
        post={{
          createdAt: post.createdAt,
          text: post.text
        }}
        user={user}
      />
    </Paper>
  )
}

export default Post;