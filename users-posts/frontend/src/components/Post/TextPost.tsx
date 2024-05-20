import { Container, styled } from "@mui/material";

type Props = {
  text: string;
  onClickUpdate: () => void
};

const Text = styled(Container)(({ theme }) => ({
  display: 'flex',
  minHeight: '5rem',
  padding: '0.5rem 0.5rem 0.5rem 0',
  marginTop: '0.5rem',
  width: '100%',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  borderRadius: '0.5rem',
}));

const TextPost = ({ text, onClickUpdate }: Props) => {
  return (
    <Text onClick={onClickUpdate}>
      {text}
    </Text>
  )
}

export default TextPost;