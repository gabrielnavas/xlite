import { Alert, AlertColor, Snackbar, SnackbarOrigin, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import CreatePost from "../Post/CreatePost/CreatePost";
import PostComponent from "../Post/Post";
import remotePost from "../../services/RemotePost";
import PostMessage from "../Post/PostMessage";
import { routePaths } from "../../Router";
import { useNavigate } from "react-router-dom";
import localAuthManager from "../../services/LocalAuthManager";

const Page = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '85%',
  [theme.breakpoints.down('md')]: {
    width: '92%',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '97%',
  },
}));

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

type Post = {
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
  name: string;
  username: string;
}

type SnackData = {
  open: boolean,
  message: string,
  severity: string,
  position?: SnackbarOrigin
}

const Right = () => {
  const [snack, setSnack] = useState<SnackData>({} as SnackData);

  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>({} as User);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    setSnack({ message: "Your session has expired!", open: true, severity: 'info', position: { horizontal: 'center', vertical: 'bottom' } })
    setTimeout(() => {
      localAuthManager().logout();
      navigate(routePaths.auth.login)
    }, 3000)
  }, [navigate])

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

  useEffect(() => {
    setUser({
      avatarUrl: "https://pbs.twimg.com/profile_images/1743633889216630784/j6WRSKS4_400x400.jpg",
      name: 'Gabs',
      username: 'xgnavas'
    });
  }, []);

  useEffect(() => {
    remotePost().getAllMyPosts().then(result => {
      if (result.tokenExpired) {
        logout()
        return
      }
      if (result.body) {
        loadNewsPosts(result.body)
      }
    })
  }, [loadNewsPosts, logout]);

  const onCreatePost = async (description: string) => {
    try {
      const result = await remotePost().createPost(description)
      if (!result.success) {
        console.log(result.message)
        setSnack({ message: "Try again later", open: true, severity: 'error' as AlertColor, position: { horizontal: 'center', vertical: 'bottom' } })
      } else {
        if (result.body) {
          addNewPost(result.body)

        }
      }
    } catch (ex) {
      setSnack({ message: "Try again later", open: true, severity: 'error' as AlertColor })
      console.log(ex)
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
      <PostComponent
        key={`${post.id}${index}`}
        user={user!}
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
    <Page>
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
    </Page>
  )
}

export default Right;