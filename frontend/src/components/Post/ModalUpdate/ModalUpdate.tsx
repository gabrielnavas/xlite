import { Modal } from "@mui/material";
import BoxInside from "./BoxInside";

export type UpdateForm = {
  description: string;
}

export type Data = {
  user: {
    avatarUrl: string
    name: string;
    username: string;
  },
  post: {
    text: string;
    createdAt: Date;
  }
}

type Props = {
  open: boolean
  onClose: () => void,
  data: Data;
  onFinishUpdate: (data: UpdateForm) => void
};

const ModalUpdate = ({ open, onClose, data, onFinishUpdate }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxInside 
        data={data}
        onFinishUpdate={onFinishUpdate}
      />
    </Modal>
  )
}
export default ModalUpdate;