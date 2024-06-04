import { Box, styled } from "@mui/material";

type Props = {
  children: React.ReactNode
}



const PostBase = ({ children }: Props) => {
  const PostContainer = styled(Box)(() => ({
    display: 'flex',
    minHeight: '5rem',
    minWidth: `31rem`,
    padding: '1rem 1rem 1rem 0.25rem',
    background: '#15202B',
  }));

  return (
    <PostContainer>
      {children}
    </PostContainer>
  )
}

export default PostBase