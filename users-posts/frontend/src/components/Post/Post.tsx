import { useState } from "react";
import { Paper, styled } from "@mui/material";

import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import ModalUpdate from "./ModalUpdate/ModalUpdate";
import RemoveDialog from "./RemovePost/RemoveDialog";

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

const Container = styled(Paper)(({ theme }) => ({
  display: 'flex',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
  [theme.breakpoints.down('md')]: {
    width: '32rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '21rem',
  },
}));


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
    <Container>
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
      <RemoveDialog
        onClickClose={() => setRemoveShieldOpen(false)}
        onClickRemove={onClickRemove}
        onClickOpen={() => setRemoveShieldOpen(true)}
        open={removeShieldOpen}
      />
    </Container>
  )
}

export default Post;