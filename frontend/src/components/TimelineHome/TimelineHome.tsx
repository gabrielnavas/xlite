import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, AlertColor, Snackbar, styled } from "@mui/material";

import localAuthManager from "../../services/LocalAuthManager";

import Timeline, { Post, SnackData } from "../Timeline/Timeline";
import { routePaths } from "../../Router";
import remotePost from "../../services/RemotePost";

const Container = styled('div')(() => ({
}));

const TimelineContainer = styled('div')(() => ({
}));


const TimelineHome = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [snack, setSnack] = useState<SnackData>({} as SnackData);

  const navigate = useNavigate()

  const logout = useCallback(() => {
    setSnack({ message: "Your session has expired!", open: true, severity: 'info', position: { horizontal: 'center', vertical: 'bottom' } })
    setTimeout(() => {
      localAuthManager().logout();
      navigate(routePaths.auth.login)
    }, 3000)
  }, [navigate])

  useEffect(() => {
    (async () => {
      const result = await remotePost().getAllMyPosts()
      if (result.tokenExpired) {
        logout()
        return
      }
      if (result.body) {
        setPosts(result.body)
      }
    })()
  }, [logout]);

  return (
    <Container>
      <TimelineContainer>
        <Timeline posts={posts} />
      </TimelineContainer>

      <Snackbar
        open={snack.open}
        onClose={() => setSnack({
          open: false,
          message: '',
          severity: '',
          position: { horizontal: 'center', vertical: 'bottom' }
        })}
        autoHideDuration={5000}
        anchorOrigin={snack.position} >
        <Alert severity={snack.severity as AlertColor} sx={{ width: '100%' }}>
          <span style={{ fontSize: '1.1rem' }}>{snack.message}</span>
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default TimelineHome;