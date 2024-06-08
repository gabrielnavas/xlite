import LeftSide from "./LeftSide";
import PostBase from "../Post/PostBase";
import RightSide from "./RightSide";
import { styled } from "@mui/material";

const Container = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
}));

const CreatePost = () => {
  return (
    <PostBase>
      <Container>
        <LeftSide />
        <RightSide />
      </Container>
    </PostBase>
  )
}

export default CreatePost;