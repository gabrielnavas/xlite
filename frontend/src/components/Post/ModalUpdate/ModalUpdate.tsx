import { Modal } from "@mui/material";

import { Data, UpdateForm } from "./types";
import ModalContent from "./ModalContent";

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
      <ModalContent
        data={data}
        onFinishUpdate={onFinishUpdate}
      />
    </Modal>
  )
}
export default ModalUpdate;