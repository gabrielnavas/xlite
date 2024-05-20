import Header from "./Header";
import PostDescription from "./PostDescription";

type Props = {
  user: {
    name: string;
    username: string;
  },
  post: {
    createdAt: Date;
    text: string;
  }
  onClickUpdate: () => void
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as React.CSSProperties;

const RightSide = ({ post, user, onClickUpdate }: Props) => {
  return (
    <section style={style} >
      <Header
        datePost={post.createdAt}
        name={user.name}
        username={user.username}
      />
      <PostDescription text={post.text} onClickUpdate={onClickUpdate} />
    </section>
  )
}

export default RightSide;