import { styled } from "@mui/material";
import HeaderPost from "../HeaderPost/HeaderPost";
import PostDescription from "./PostDescription";
import { Post } from "../../../services/post/RemotePost";


const Container = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '32rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '15.2rem',
  },
}));


type Props = {
  post: Post & {
    onClickUpdate: () => void;
    openOnRemoveQuestionShield: () => void;
  }
}

const RightSide = ({ post }: Props) => {
  return (
    <Container>
      <HeaderPost
        datePost={post.createdAt}
        name={post.owner.fullName}
        username={post.owner.username}
        openOnRemoveQuestionShield={post.openOnRemoveQuestionShield}
      />
      <PostDescription text={post.description} onClickUpdate={post.onClickUpdate} />
    </Container>
  )
}

export default RightSide;