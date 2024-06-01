import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import CreatePost from "../Post/CreatePost/CreatePost";
import PostComponent from "../Post/Post";
import remotePost from "../../services/RemotePost";
import PostMessage from "../Post/PostMessage";

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


const Right = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>({} as User);


  useEffect(() => {
    setUser({
      avatarUrl: "https://pbs.twimg.com/profile_images/1743633889216630784/j6WRSKS4_400x400.jpg",
      name: 'Gabs',
      username: 'xgnavas'
    });
  }, []);

  useEffect(() => {
    const inTimeLine = (postId: string) => posts.find(p => p.id === postId);
    remotePost().getAllMyPosts().then(result => {
      if (result.body) {
        const newPosts = result.body.filter(post => !inTimeLine(post.id))
        setPosts([...newPosts, ...posts])
      }
    })
  }, []);

  const onCreatePost = async (description: string) => {
    try {
      const result = await remotePost().createPost(description)
      if (!result.success) {
        console.log(result.message)
      } else {
        if (result.body) {
          const newPost: Post = result.body
          setPosts([newPost, ...posts])
        }
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const onRemovePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  }

  const postsOrEmptyMessage = posts.length === 0 ? (
    <PostMessage message="Start with post..." />
  ) : (
    posts.map((post) => (
      <PostComponent
        key={post.id}
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
        { postsOrEmptyMessage }
      </Feed>
    </Page>
  )
}

export default Right;