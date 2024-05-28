import { Box, styled } from "@mui/material"

import PostAddIcon from '@mui/icons-material/PostAdd';
import PostBase from "./PostBase";

const MessageContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '5rem',
  width: '100%',
}));

const Message = styled('span')(() => ({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginLeft: '0.6rem'
}));


type Props = {
  message: string
}

const PostMessage = ({ message }: Props) => {
  return (
    <PostBase>
      <MessageContainer>
        <PostAddIcon color="primary" />
        <Message>{message}</Message>
      </MessageContainer>
    </PostBase>
  )
}

export default PostMessage;