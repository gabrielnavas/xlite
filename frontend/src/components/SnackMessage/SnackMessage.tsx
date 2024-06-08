import { useEffect, useState } from "react";

import { useAppSelector } from "../../store/store";

import { Alert, AlertColor, Snackbar } from "@mui/material";


const SnackbarMessage = () => {
  const [snack, setSnack] = useState({ open: false, message: '', severity: '' as AlertColor });

  const remoteRequest = useAppSelector(state => state.remoteRequest)

  useEffect(() => {
    if(remoteRequest.successMessage) {
      setSnack({message: remoteRequest.successMessage, open: true, severity: 'success'})
    } else if(remoteRequest.warningMessage) {
      setSnack({message: remoteRequest.warningMessage, open: true, severity: 'warning'})
    } else if(remoteRequest.errorMessage) {
      setSnack({message: remoteRequest.errorMessage, open: true, severity: 'error'})
    } else if(remoteRequest.infoMessage) {
      setSnack({message: remoteRequest.infoMessage, open: true, severity: 'info'})
    }
  }, [remoteRequest])

  return (
    <Snackbar
      open={snack.open}
      onClose={() => setSnack({ open: false, message: '', severity: 'success' })}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
      <Alert severity={snack.severity as AlertColor} sx={{ width: '100%' }}>
        <span style={{ fontSize: '1.1rem' }}>{snack.message}</span>
      </Alert>
    </Snackbar>
  )
}

export default SnackbarMessage