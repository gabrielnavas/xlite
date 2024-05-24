import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import CreatePost from "../Post/CreatePost/CreatePost";
import PostComponent from "../Post/Post";
import remotePost from "../../services/RemotePost";
import PostMessage from "../Post/PostMessage";

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

  const onCreatePost = async (description: string) => {
    try {
      const result = await remotePost().createPost(description) 
      if(!result.success) {
        console.log(result.message)
      } else {
        if(result.body) {
          const newPost: Post = result.body
          setPosts([newPost, ...posts])
        }
      }
    }catch(ex) {
      console.log(ex)
    }
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
          posts.length === 0 ? (
            <PostMessage message="Start with post..." />
          ): (
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
        }
      </Feed>
    </Container>
  )
}

export default Right;