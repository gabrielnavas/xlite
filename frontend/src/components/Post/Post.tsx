import { useState } from "react";

import LeftSide from "./CreatePost/LeftSide";
import RightSide from "./RightSide/RightSide";
import ModalUpdate from "./ModalUpdate/ModalUpdate";
import RemoveDialog from "./RemovePost/RemoveDialog";
import PostBase from "./PostBase";
import remotePost from "../../services/RemotePost";
import { SnackData } from "../Timeline/Timeline";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../Router";
import { Alert, AlertColor, Snackbar } from "@mui/material";

type Props = {
  user: {
    avatarUrl: string
    fullName: string;
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

  const [snack, setSnack] = useState<SnackData>({} as SnackData);

  const navigate = useNavigate()

  const onFinishUpdate = (postId: string, postDescription: string): void => {
    remotePost().updatePost(postId, postDescription).then((result) => {
      if (!result.success) {
        setSnack({ message: result.message, open: true, severity: 'warning', position: { horizontal: 'center', vertical: 'bottom' } })
        if (result.tokenExpired) {
          setTimeout(() => {
            navigate(routePaths.auth.login)
          }, 2000)
        }
      } else {
        post.text = postDescription;
        setUpdateModalOpen(false);
        setSnack({ message: result.message, open: true, severity: 'success', position: { horizontal: 'center', vertical: 'bottom' } })
      }
    })
    .catch((ex) => {
      console.log(ex);
      setSnack({ message: 'try again later', open: true, severity: 'warning', position: { horizontal: 'center', vertical: 'bottom' } })
    })
  }

  const onClickRemove = (): void => {
    remotePost().deletePost(post.id).then((result) => {
      if (!result.success) {
        setSnack({ message: result.message, open: true, severity: 'warning', position: { horizontal: 'center', vertical: 'bottom' } })
        if (result.tokenExpired) {
          setTimeout(() => {
            navigate(routePaths.auth.login)
          }, 2000)
        }
      } else {
        setSnack({ message: result.message, open: true, severity: 'success', position: { horizontal: 'center', vertical: 'bottom' } })
        post.onRemove(post.id)
      }
    })
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
        onFinishUpdate={data => onFinishUpdate(post.id, data.description)}
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

      <Snackbar
        open={snack.open}
        onClose={() => setSnack({
          open: false,
          message: '',
          severity: '',
          position: { horizontal: 'center', vertical: 'bottom' }
        })}
        autoHideDuration={5000}
        anchorOrigin={snack.position} >
        <Alert severity={snack.severity as AlertColor} sx={{ width: '100%' }}>
          <span style={{ fontSize: '1.1rem' }}>{snack.message}</span>
        </Alert>
      </Snackbar>
    </PostBase>
  )
}

export default Post;