import { Button, IconButton, TextField, styled } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useRef, useState } from "react";
import remotePost from "../../services/post/RemotePost";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { failedMessage, remoteFinish, remoteRequest, successMessage, warningMessage } from "../../store/features/remoteRequestSlice";
import { addPosts, removePost } from "../../store/features/postsSlice";
import { CloseSharp, ImageSearch } from "@mui/icons-material";

const Container = styled('div')(() => ({
  width: '100%'
}));

const FormContainer = styled('form')(() => ({
}));

const Buttons = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  paddingRight: '0.5rem',
  padding: '0.3rem 0 1.1rem 0',
}));

const ButtonCreatePost = styled(Button)(() => ({
}));

const ButtonPickImages = styled(IconButton)(() => ({
  marginRight: '2rem'
}));

const ContainerImages = styled('section')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ImageContainer = styled('div')(() => ({
  position: 'relative',
}));

const Image = styled('img')(() => ({
  marginBottom: '0.5rem',
  maxWidth: '100%'
}));

const RemoveImage = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  width: '20px',
  height: '20px',
  padding: '1.2rem',
  fontWeight: 'bold',
  color: theme.palette.error.dark,
  right: 0,
  top: 0,
}));

type CreateForm = {
  description: string;
}

const validationSchema = yup.object<CreateForm>({
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'Description should be of minimum 2 characters length')
    .max(255, 'Description should be of maximum 255 characters length'),
});


const Form = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const refImage = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch()
  const token = useAppSelector(store => store.auth.token)

  const formik = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: CreateForm, { resetForm }) => {
      onCreatePost(values.description, imageUrls).then(() => {
        resetForm();
      })
    }
  });

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = [...event.target.files];
    if(files.length > 2) {
      dispatch(warningMessage({ message: 'Only two photos are allowed.' }))
      return;
    }
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setImageUrls(imageUrls);
  };

  const remoteAndStorePostImages = async (postId: string, imagesUrl: string[]) => {
    const remotePostService = remotePost()
    const resultImages = await remotePostService.uploadImages(token)(postId, imagesUrl)
    if (!resultImages.success) {
      dispatch(failedMessage({ message: resultImages.message }))
      return
    }
    if (!resultImages.body) {
      dispatch(failedMessage({ message: "Try again later." }))
      return
    }
    const post = resultImages.body
    dispatch(addPosts({ posts: [post] }))
    dispatch(successMessage({ message: resultImages.message }))
    setImageUrls([])
  }

  const onCreatePost = async (description: string, imagesUrl: string[]) => {
    try {
      dispatch(remoteRequest())
      const remotePostService = remotePost()
      const resultPost = await remotePostService.createPost(token)(description)
      if (!resultPost.success || !resultPost.body) {
        dispatch(failedMessage({ message: "Try again later." }))
        if (resultPost.body) {
          const post = resultPost.body
          await remotePostService.deletePost(post.id)
          dispatch(removePost({
            postId: post.id
          }))
        }
        return
      }

      if (imagesUrl.length > 0) {
        await remoteAndStorePostImages(resultPost.body.id, imagesUrl)
        return
      }

      const post = resultPost.body
      dispatch(addPosts({ posts: [post] }))
      dispatch(successMessage({ message: resultPost.message }))
    } catch (ex) {
      dispatch(failedMessage({ message: "Try again later." }))
    } finally {
      dispatch(remoteFinish())
    }
  }

  const removeImageFromSelected = (imageUrl: string) => {
    const imageUrlsFiltred = imageUrls.filter(url => url !== imageUrl)
    setImageUrls(imageUrlsFiltred)
  }

  return (
    <Container>
      <FormContainer onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={10}
          id="description"
          name="description"
          label="What are you thinking?"
          margin="normal"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Buttons>
          <ButtonPickImages onClick={() => refImage.current?.click()}>
            <ImageSearch />
          </ButtonPickImages>
          <ButtonCreatePost
            color="primary"
            variant="contained"
            type="submit"
            size="small">
            Create
          </ButtonCreatePost>
        </Buttons>
        <ContainerImages>
          <input hidden ref={refImage} type="file" onChange={handleSelectImage} multiple />
          {
            imageUrls.map((imageUrl, index) => (
              <ImageContainer  key={index}>
                <Image
                  src={imageUrl}
                  alt="preview-image"
                />
                <RemoveImage 
                  onClick={() => removeImageFromSelected(imageUrl)}
                  size="large" >
                  <CloseSharp />
                </RemoveImage>
              </ImageContainer>
            ))
          }
        </ContainerImages>
      </FormContainer>
    </Container>
  )
}

export default Form;