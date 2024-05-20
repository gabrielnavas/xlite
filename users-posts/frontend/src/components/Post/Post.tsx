import { Paper } from "@mui/material";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import UpdatePostModal from "./UpdatePostModal";
import { useState } from "react";

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
} as React.CSSProperties;

const Post = ({ user, post }: Props) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const onFinishUpdate = (data: { description: string }): void => {
    post.text = data.description;
    setUpdateModalOpen(false);
  }

  return (
    <Paper sx={style} >
      <LeftSide
        avatarUrl={user.avatarUrl}
      />

      <RightSide
        onClickUpdate={() => setUpdateModalOpen(true)}
        post={{
          createdAt: post.createdAt,
          text: post.text
        }}
        user={user}
      />

      <UpdatePostModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onFinishUpdate={onFinishUpdate}
        data={{
          user: user,
          post: post
        }} />
    </Paper>
  )
}

export default Post;