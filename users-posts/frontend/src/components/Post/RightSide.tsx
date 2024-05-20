import Header from "./Header";
import TextPost from "./TextPost";

type Props = {
  user: {
    name: string;
    username: string;
  },
  post: {
    createdAt: Date;
    text: string;
  }
}

const style = {
  display: 'flex',
  flexDirection: 'column',
} as React.CSSProperties;

const RightSide = ({ post, user }: Props) => {
  return (
    <section style={style}>
      <Header 
        datePost={post.createdAt} 
        name={user.name} 
        username={user.username}
      />
      <TextPost text={post.text} />
    </section>
  )
}

export default RightSide;