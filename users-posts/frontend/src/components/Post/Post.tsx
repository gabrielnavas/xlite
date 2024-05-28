import { useState } from "react";

import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import ModalUpdate from "./ModalUpdate/ModalUpdate";
import RemoveDialog from "./RemovePost/RemoveDialog";
import PostBase from "./PostBase";

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
    <PostBase>
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
    </PostBase>
  )
}

export default Post;