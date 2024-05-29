import { Alert, AlertColor, Snackbar } from "@mui/material"

export type SnackProps = { open: boolean, message: string, severity: AlertColor };

type Props = {
  open: boolean
  snack: SnackProps;
  setSnack: (props: SnackProps) => void
}

const SnackBarMessage = (props: Props) => {
  return (
    <Snackbar
      open={props.open}
      onClose={() => props.setSnack({ open: false, message: '', severity: 'success' })}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
      <Alert severity={props.snack.severity as AlertColor} sx={{ width: '100%' }}>
        <span style={{ fontSize: '1.1rem' }}>{props.snack.message}</span>
      </Alert>
    </Snackbar>
  )
}

export default SnackBarMessage;