import { useState } from "react";

import { useNavigate } from "react-router-dom";


import remotePost, { Post } from "../../services/post/RemotePost";

import { routePaths } from "../../Router";

import PostBase from "./PostBase";
import BottomSide from "./BottomSide/BottomSide";
import TopSide from "./TopSide/TopSide";
import PostImages from "./PostImages/PostImages";
import LeftSide from "../CreatePost/LeftSide";
import RightSide from "./RightSide/RightSide";
import ModalUpdate from "./ModalUpdate/ModalUpdate";
import RemoveDialog from "./RemovePost/RemoveDialog";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { infoMessage, successMessage, warningMessage } from "../../store/features/remoteRequestSlice";
import { removePost } from "../../store/features/postsSlice";
import { styled } from "@mui/material";


const PostContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type Props = {
  post: Post
}

const PostComponent = (props: Props) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [removeShieldOpen, setRemoveShieldOpen] = useState(false);

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.auth.token)

  const onClickRemove = (): void => {
    remotePost().deletePost(token)(props.post.id).then((result) => {
      if (!result.success) {
        dispatch(warningMessage({ message: result.message }))
        if (result.tokenExpired) {
          dispatch(infoMessage({ message: 'your token is expired' }))
          navigate(routePaths.auth.login)
        }
      } else {
        dispatch(successMessage({ message: "Your litweet is removed" }))
        dispatch(removePost({ postId: props.post.id }))
      }
    }).catch(() => dispatch(warningMessage({ message: 'try again later' })))
  }

  return (
    <PostBase>
      <PostContainer>
        <TopSide>
          <LeftSide />
          <RightSide
            post={{
              ...props.post,
              onClickUpdate: () => setUpdateModalOpen(true),
              openOnRemoveQuestionShield: () => setRemoveShieldOpen(true)
            }}
          />
        </TopSide>
        <BottomSide>
          <PostImages postId={props.post.id} imageNames={props.post.imageNames} />
        </BottomSide>
        
        <ModalUpdate
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          post={props.post}
        />
        <RemoveDialog
          onClickClose={() => setRemoveShieldOpen(false)}
          onClickRemove={onClickRemove}
          onClickOpen={() => setRemoveShieldOpen(true)}
          open={removeShieldOpen}
        />
      </PostContainer>
    </PostBase>
  )
}

export default PostComponent;