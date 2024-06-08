import { useEffect, useState } from "react"
import remotePost from "../../../services/post/RemotePost"
import { useAppSelector } from "../../../store/store"
import { CircularProgress, styled } from "@mui/material"

type Props = {
  postId: string
  imageName: string
}

const Container = styled('li')(() => ({
  width: '100%',
  height: '100%',
  listStyleType: "none"
}));


const Image = styled('img')(() => ({
  height: '90%',
  width: '90%',
}));

const PostImage = ({ postId, imageName }: Props) => {
  const [urlImage, setUrlImage] = useState('')

  const token = useAppSelector(store => store.auth.token)

  useEffect(() => {
    (async () => {
      try {
        const blob = await remotePost().downloadImage(token)(postId, imageName);
        const file = new File([blob], imageName);
        const url = URL.createObjectURL(file);
        setUrlImage(url);
      }
      catch (ex) {
        console.log(ex)
      }
    })()
  }, [postId, imageName, token])

  return (
    <Container>
      {urlImage
        ? <Image src={urlImage} alt="preview-image" />
        : <CircularProgress />}
    </Container>
  )
}

export default PostImage