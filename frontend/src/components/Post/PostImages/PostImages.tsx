import { styled } from "@mui/material";
import PostImage from "../PostImage/PostImage";

const Container = styled('ul')(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

type Props = {
  postId: string;
  imageNames: string[]
}

const PostImages = ({ postId, imageNames }: Props) => {
  return (
    <Container>
      {imageNames.map(imageName => (
        <PostImage
          key={imageName}
          postId={postId}
          imageName={imageName}
        />
      ))}
    </Container>
  )
}

export default PostImages;