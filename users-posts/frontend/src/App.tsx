import { useEffect, useState } from "react";
import Post from "./components/Post/Post";

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  gap: 10,
} as React.CSSProperties;

function App() {
  const [posts, setPost] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Posts";
  }, []);


  useEffect(() => {
    setPost(new Array(50).fill('').map((_, index) => (index+1).toString()));
  }, []);

  const onRemovePost = (postIdToRemove: string) => {
    setPost(posts.filter(post => post !== postIdToRemove));
  }

  return (
    <ul style={style}>
      {
        posts.map((postId) => (
          <Post
            key={postId}
           
            user={{
              avatarUrl: "https://pbs.twimg.com/profile_images/1743633889216630784/j6WRSKS4_400x400.jpg",
              name: 'Gabs',
              username: 'xgnavas'
            }}
            post={{
              id: postId.toString(),
              createdAt: new Date('2024-05-20T16:38:06.362Z'),
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
              onRemove: onRemovePost
            }}
          />
        ))
      }
    </ul>
  )
}

export default App
