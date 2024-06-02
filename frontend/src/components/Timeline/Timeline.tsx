import { Alert, AlertColor, Snackbar, SnackbarOrigin, styled } from "@mui/material";
import CreatePost from "../Post/CreatePost/CreatePost";
import { useCallback, useEffect, useState } from "react";
import PostMessage from "../Post/PostMessage";
import Post from "../Post/Post";
import remotePost from "../../services/RemotePost";
import localUserManager from "../../services/LocalUserManager";


const Container = styled('div')(() => ({
}));

export type Post = {
  id: string;
  createdAt: Date;
  description: string;
  owner: {
    id: string
    avatarUrl: string;
    fullName: string;
    username: string;
  }
}

type User = {
  avatarUrl: string;
}

const Feed = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '75%',
  gap: 10,
  borderLeft: '1px solid gray',
  [theme.breakpoints.down('md')]: {
    borderLeft: 'none',
    width: '100%',
  },
}));


export type SnackData = {
  open: boolean,
  message: string,
  severity: string,
  position?: SnackbarOrigin
}

type Props = {
  posts: Post[]
}

const Timeline = (props: Props) => {
  const [snack, setSnack] = useState<SnackData>({} as SnackData);
  const [user, setUser] = useState<User>({} as User);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  useEffect(() => {
    localUserManager().getUserLogged().then(user => {
      user.createdAt
      setUser({ avatarUrl: user.avatarUrl });
    })
  }, []);

  const inTimeLine = useCallback((postId: string) => posts.find(p => p.id === postId), []);

  const loadNewsPosts = useCallback((posts: Post[]) => {
    const newPosts = posts.filter(post => !inTimeLine(post.id))
    setPosts([...newPosts, ...posts])
  }, [inTimeLine])

  const addNewPost = useCallback((newPost: Post) => {
    loadNewsPosts([newPost, ...posts])
    setPosts([newPost, ...posts])
    setSnack({
      message: "Your litweet is posted",
      open: true,
      severity: 'success' as AlertColor,
      position: { horizontal: 'center', vertical: 'bottom' }
    })
  }, [loadNewsPosts, posts])

  const onCreatePost = async (description: string) => {
    try {
      const result = await remotePost().createPost(description)
      if (!result.success) {
        setSnack({ message: "Try again later", open: true, severity: 'error' as AlertColor, position: { horizontal: 'center', vertical: 'bottom' } })
      } else {
        if (result.body) {
          addNewPost(result.body)

        }
      }
    } catch (ex) {
      setSnack({ message: "Try again later", open: true, severity: 'error' as AlertColor })
    }
  }

  const onRemovePost = (postId: string) => {
    setSnack({ message: "Your litweet is removed", open: true, severity: 'success' as AlertColor, position: { horizontal: 'center', vertical: 'bottom' } })
    setPosts(posts.filter(post => post.id !== postId));
  }

  const postsOrEmptyMessage = posts.length === 0 ? (
    <PostMessage message="Start with post..." />
  ) : (
    posts.map((post, index) => (
      <Post
        key={`${post.id}${index}`}
        user={{
          avatarUrl: post.owner.avatarUrl,
          fullName: post.owner.fullName,
          username: post.owner.username
        }}
        post={{
          id: post.id,
          createdAt: post.createdAt,
          text: post.description,
          onRemove: () => onRemovePost(post.id),
        }}
      />
    ))
  )

  return (
    <Container>
      <Feed>
        <CreatePost user={{
          avatarUrl: user.avatarUrl,
          createPostOnClick: onCreatePost,
        }} />
        {postsOrEmptyMessage}
      </Feed>

      <Snackbar
        open={snack.open}
        onClose={() => setSnack({ open: false, message: '', severity: '', position: { horizontal: 'center', vertical: 'bottom' } })}
        autoHideDuration={5000}
        anchorOrigin={snack.position} >
        <Alert severity={snack.severity as AlertColor} sx={{ width: '100%' }}>
          <span style={{ fontSize: '1.1rem' }}>{snack.message}</span>
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Timeline;