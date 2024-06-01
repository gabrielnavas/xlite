import { Box, styled } from "@mui/material";

type Props = {
  children: React.ReactNode
}

const PostContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '5rem',
  width: '35rem',
  padding: '1rem 1rem 1rem 0.25rem',
  background: '#15202B',
  [theme.breakpoints.down('md')]: {
    width: '32rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '21rem',
  },
  [theme.breakpoints.down(400)]: {
    width: '18.5rem',
  },
  [theme.breakpoints.down(420)]: {
    width: '20rem',
  },
}));

const PostBase = ({ children }: Props) => {
  return (
    <PostContainer>
      {children}
    </PostContainer>
  )
}

export default PostBase