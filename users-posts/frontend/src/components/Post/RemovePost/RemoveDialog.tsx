import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type Props = {
  onClickOpen: () => void
  onClickClose: () => void
  onClickRemove: () => void
  open: boolean
}
  
const RemoveDialog = ({ onClickOpen, open, onClickClose, onClickRemove }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClickOpen}
    >
      <DialogTitle >
        {"Warning!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText >
          Do you really agree to remove this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickClose}>Cancel</Button>
        <Button onClick={onClickRemove} autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveDialog;