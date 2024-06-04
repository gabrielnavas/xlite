import LeftSide from "./LeftSide";
import PostBase from "../PostBase";
import RightSide from "./RightSide";

type Props = {
  user: {
    avatarUrl: string
    createPostOnClick: (description: string) => void
  },
}

const CreatePost = ({ user }: Props) => {
  return (
    <PostBase>
      <LeftSide avatarUrl={user.avatarUrl} />
      <RightSide user={{
        createPostOnClick: user.createPostOnClick,
        avatarUrl: user.avatarUrl
      }} />
    </PostBase>
  )
}

export default CreatePost;