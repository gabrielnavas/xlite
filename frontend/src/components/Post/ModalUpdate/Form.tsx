import { Theme } from "@emotion/react";
import { Box, Button, TextField } from "@mui/material";

import { UpdateForm } from "./types";

import { useFormik } from "formik";
import * as yup from 'yup';
import { formatDistanceToNow } from "date-fns";
import remotePost, { Post } from "../../../services/post/RemotePost";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { infoMessage, remoteFinish, remoteRequest, successMessage, warningMessage } from "../../../store/features/remoteRequestSlice";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../Router";
import { updatePost } from "../../../store/features/postsSlice";

const validationSchema = yup.object<UpdateForm>({
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'Description should be of minimum 2 characters length')
    .max(255, 'Description should be of maximum 255 characters length'),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '0.5rem',
  p: 4,
} as Theme;


type Props = {
  post: Post;
  onClose: () => void
}

const Form = ({ post, onClose }: Props) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(store => store.auth.token)
  const navigate = useNavigate()

  const tokenExpired = () => {
    dispatch(infoMessage({ message: 'your token is expired' }))
    navigate(routePaths.auth.login)
  }
  
  const onFinishUpdate = async (postId: string, postDescription: string): Promise<void> => {
    try {
      dispatch(remoteRequest())
      const result = await remotePost().updatePost(token)(postId, postDescription)
      if (!result.success) {
        dispatch(warningMessage({ message: result.message }))
        if (result.tokenExpired) {
          tokenExpired()
        }
      } else {
        dispatch(updatePost({ postId: post.id, description: postDescription }))
        dispatch(successMessage({ message: result.message }))
        onClose();
      }
    }
    catch (ex) {
      dispatch(warningMessage({ message: 'try again later' }))
    }
    finally {
      dispatch(remoteFinish())
    }
  }

  const formik = useFormik({
    initialValues: {
      description: post.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values: UpdateForm) => onFinishUpdate(post.id, values.description),
  });

  const date: string = formatDistanceToNow(post.createdAt, { addSuffix: true });


  return (
    <Box sx={style}>
      <div>Created at {date}</div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          multiline
          autoFocus
          id="description"
          name="description"
          label="Description"
          margin="normal"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" size="small">
          Update
        </Button>
      </form>
    </Box>
  )
}


export default Form;