import { useState } from "react";
import { Paper } from "@mui/material";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import ModalUpdate from "./ModalUpdate/ModalUpdate";
import DialogRemovePost from "./DialogDelete";

type Props = {
  user: {
    avatarUrl: string
    name: string;
    username: string;
  },
  post: {
    id: string,
    text: string;
    createdAt: Date;
    onRemove: (postId: string) => void
  },
}

const style = {
  display: 'flex',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
} as React.CSSProperties;

const Post = ({ user, post }: Props) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [removeShieldOpen, setRemoveShieldOpen] = useState(false);

  const onFinishUpdate = (data: { description: string }): void => {
    post.text = data.description;
    setUpdateModalOpen(false);
  }

  const onClickRemove = (): void => {
    post.onRemove(post.id)
  }

  return (
    <Paper sx={style} >
      <LeftSide
        avatarUrl={user.avatarUrl}
      />
      <RightSide
        post={{
          createdAt: post.createdAt,
          text: post.text,
          onClickUpdate: () => setUpdateModalOpen(true),
          openOnRemoveQuestionShield: () => setRemoveShieldOpen(true)
        }}
        user={user}
      />
      <ModalUpdate
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onFinishUpdate={onFinishUpdate}
        data={{
          user: user,
          post: post
        }} />
      <DialogRemovePost
        onClickClose={() => setRemoveShieldOpen(false)}
        onClickRemove={onClickRemove}
        onClickOpen={() => setRemoveShieldOpen(true)}
        open={removeShieldOpen}
      />
    </Paper>
  )
}

export default Post;