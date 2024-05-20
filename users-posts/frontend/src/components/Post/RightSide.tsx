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
    onClickUpdate: () => void;
    openOnRemoveQuestionShield: () => void;
  }
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as React.CSSProperties;

const RightSide = ({ post, user }: Props) => {
  return (
    <section style={style} >
      <Header
        datePost={post.createdAt}
        name={user.name}
        username={user.username}
        openOnRemoveQuestionShield={post.openOnRemoveQuestionShield}
      />
      <PostDescription text={post.text} onClickUpdate={post.onClickUpdate} />
    </section>
  )
}

export default RightSide;