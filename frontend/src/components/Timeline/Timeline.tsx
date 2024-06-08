import { styled } from "@mui/material";
import CreatePost from "../CreatePost/CreatePost";
import PostMessage from "../Post/PostMessage";
import PostComponent from "../Post/Post";
import { Post } from "../../services/post/RemotePost";


const Container = styled('div')(() => ({
}));

const Feed = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '75%',
  gap: 10,
  [theme.breakpoints.down('md')]: {
    borderLeft: 'none',
    width: '100%',
  },
}));


type Props = {
  posts: Post[]
}

const Timeline = (props: Props) => {
  return (
    <Container>
      <Feed>
        <CreatePost />
        {
          props.posts.length === 0 ? (
            <PostMessage message="Start with post..." />
          ) : (
            props.posts.map(post => (
              <PostComponent key={post.id} post={post} />
            ))
          )
        }
      </Feed>
    </Container>
  )
}

export default Timeline;