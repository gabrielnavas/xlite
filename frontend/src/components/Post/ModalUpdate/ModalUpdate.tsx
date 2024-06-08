import { Modal } from "@mui/material";

import ModalContent from "./ModalContent";
import { Post } from "../../../services/post/RemotePost";

type Props = {
  open: boolean
  onClose: () => void,
  post: Post;
};

const ModalUpdate = ({ open, onClose, post }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <ModalContent
        post={post}
        onClose={onClose}
      />
    </Modal>
  )
}
export default ModalUpdate;