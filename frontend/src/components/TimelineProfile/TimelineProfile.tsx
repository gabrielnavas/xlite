import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material";

import Timeline from "../Timeline/Timeline";

import { routePaths } from "../../Router";

import remotePost from "../../services/post/RemotePost";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { infoMessage, remoteFinish, remoteRequest } from "../../store/features/remoteRequestSlice";
import { logout } from "../../store/features/authSlice";
import { addPosts, getPostsByUsername } from "../../store/features/postsSlice";

const Container = styled('div')(() => ({}));
const TimelineContainer = styled('div')(() => ({}));

const TimelineProfile = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector(store => store.auth.token)
  const username = useAppSelector(store => store.user.data.username)
  const timeline = useAppSelector(store => store.posts.timeline)

  useEffect(() => {
    (async () => {
      dispatch(remoteRequest())
      const result = await remotePost().getAllByOwner(token)()
      if (result.tokenExpired) {
        dispatch(infoMessage({ message: "Your session has expired!" }))
        dispatch(logout())
        navigate(routePaths.auth.login)

        return
      }
      if (result.body) {
        dispatch(addPosts({ posts: result.body }))
      }
      dispatch(remoteFinish())
    })()
  }, [dispatch, navigate, token]);

  return (
    <Container>
      <TimelineContainer>
        <Timeline posts={getPostsByUsername(username, timeline)} />
      </TimelineContainer>
    </Container>
  )
}

export default TimelineProfile;