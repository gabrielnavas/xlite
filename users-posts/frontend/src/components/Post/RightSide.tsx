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
      <TextPost text={post.text} onClickUpdate={onClickUpdate} />
    </section>
  )
}

export default RightSide;