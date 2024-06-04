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
        <Button size="small" variant="outlined" onClick={onClickClose}>Cancel</Button>
        <Button size="small" color="error" variant="contained" onClick={onClickRemove} autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveDialog;