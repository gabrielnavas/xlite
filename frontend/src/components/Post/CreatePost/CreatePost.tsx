import LeftSide from "../LeftSide/LeftSide";
import CreatePostRightSide from "./CreatePostRightSide";
import PostBase from "../PostBase";

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
      <CreatePostRightSide createPostOnClick={user.createPostOnClick} />
    </PostBase>
  )
}

export default CreatePost;