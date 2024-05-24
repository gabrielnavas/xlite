import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import CreatePost from "../Post/CreatePost/CreatePost";
import Post from "../Post/Post";

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  gap: 10,
} as React.CSSProperties;

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '90%',
}));

const Feed = styled('ul')(() => ({
  borderLeft: '1px solid gray',
}));

type Post = {
  id: string;
  createdAt: Date;
  description: string;
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
    const posts: Post[] = new Array(50).fill('').map((_, index) => ({
      id: (index + 1).toString(),
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
    <Container>
      <Feed style={style}>
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
      </Feed>
    </Container>
  )
}

export default Right;