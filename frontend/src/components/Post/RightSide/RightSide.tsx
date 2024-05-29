import { styled } from "@mui/material";
import HeaderPost from "../HeaderPost/HeaderPost";
import PostDescription from "./PostDescription";



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
  user: {
    name: string;
    username: string;
  },
  post: {
    createdAt: Date;
    text: string;
    onClickUpdate: () => void;
    openOnRemoveQuestionShield: () => void;
  }
}

const RightSide = ({ post, user }: Props) => {
  return (
    <Container>
      <HeaderPost
        datePost={post.createdAt}
        name={user.name}
        username={user.username}
        openOnRemoveQuestionShield={post.openOnRemoveQuestionShield}
      />
      <PostDescription text={post.text} onClickUpdate={post.onClickUpdate} />
    </Container>
  )
}

export default RightSide;