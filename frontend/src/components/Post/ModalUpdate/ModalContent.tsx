import { forwardRef } from "react";

import Form from "./Form";
import { Post } from "../../../services/post/RemotePost";

type BoxInsideProps = {
  post: Post
  onClose: () => void
};

const ModalContent = forwardRef<HTMLDivElement, BoxInsideProps>(({ post, onClose }, ref) => {
  return (
    <div ref={ref}>
      <Form
        post={post}
        onClose={onClose}
      />
    </div>
  );
});

export default ModalContent;