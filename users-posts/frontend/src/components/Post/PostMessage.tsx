import { Paper, styled } from "@mui/material"

import PostAddIcon from '@mui/icons-material/PostAdd';

const Container = styled(Paper)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
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
    <Container>
      <PostAddIcon color="primary"  />
      <Message>{message}</Message>
    </Container>
  )
}

export default PostMessage;