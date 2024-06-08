import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material";

import Timeline from "../Timeline/Timeline";
import { routePaths } from "../../Router";
import remotePost from "../../services/post/RemotePost";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addPosts } from "../../store/features/postsSlice";
import { failedMessage, infoMessage, remoteFinish, remoteRequest } from "../../store/features/remoteRequestSlice";
import { logout } from "../../store/features/authSlice";

const Container = styled('div')(() => ({}));

const TimelineContainer = styled('div')(() => ({}));


const TimelineHome = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const timeline = useAppSelector(state => state.posts.timeline)
  const token = useAppSelector(state => state.auth.token)

  useEffect(() => {
    (async () => {
      try {
        dispatch(remoteRequest())
        const result = await remotePost().getAll(token)()
        if (result.tokenExpired) {
          dispatch(infoMessage({ message: "Your session has expired!" }))
          dispatch(logout())
          navigate(routePaths.auth.login)
          return
        } else if (result.body) {
          dispatch(addPosts({ posts: result.body }))
        }
      }
      catch (ex) {
        dispatch(failedMessage({ message: 'try again later' }))
      } finally {
        dispatch(remoteFinish())
      }
    })()
  }, [dispatch, token, navigate]);

  return (
    <Container>
      <TimelineContainer>
        <Timeline posts={timeline} />
      </TimelineContainer>
    </Container>
  )
}

export default TimelineHome;