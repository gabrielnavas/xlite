import { Paper } from "@mui/material";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import ModalUpdate from "./ModalUpdate/ModalUpdate";
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
    // const maxLenthWord = 30;
    // const word = data.description
    //   .split(" ")
    //   .map(word => {
    //     let finalWord = ''
    //     for(let i=0; i < word.length; i+=maxLenthWord) {
    //       finalWord += `${word.substring(maxLenthWord)}-\n${word.substring(maxLenthWord, word.length)}` 
    //     }
    //     return finalWord;
    //   })
    //   .join(' ')
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

      <ModalUpdate
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