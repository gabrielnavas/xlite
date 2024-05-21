import { useEffect, useState } from "react";

import Post from "./components/Post/Post";
import CreatePost from "./components/Post/CreatePost/CreatePost";

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  gap: 10,
} as React.CSSProperties;

type User ={
  avatarUrl: string;
  name: string;
  username: string;
}

type Post ={
  id: string;
  createdAt: Date;
  description: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    document.title = "Posts";
  }, []);

  useEffect(() => {
    const posts: Post[] = new Array(50).fill('').map((_, index) => ({
      id: (index+1).toString(),
      createdAt: new Date('2024-05-20T16:38:06.362Z'),
      description: 'oi'
    }));

    setPosts(posts);
    setUser({
      avatarUrl: "https://pbs.twimg.com/profile_images/1743633889216630784/j6WRSKS4_400x400.jpg",
      name: 'Gabs',
      username: 'xgnavas'
    });
  }, []);

  const onCreatePost = (description: string) => {
    const newPost = {
      id: (posts.length + 1).toString(),
      createdAt: new Date(),
      description: description,
    } as Post 
    setPosts([newPost, ...posts])
  }

  const onRemovePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  }

  return (
    <ul style={style}>
      <CreatePost user={{
        avatarUrl: user.avatarUrl,
        createPostOnClick: onCreatePost,
      }} />
      {
        posts.map((post) => (
          <Post
            key={post.id}
            user={user!}
            post={{
              id: post.id,
              createdAt: new Date('2024-05-20T16:38:06.362Z'),
              text: post.description,
              onRemove: () => onRemovePost(post.id),
            }}
          />
        ))
      }
    </ul>
  )
}

export default App
