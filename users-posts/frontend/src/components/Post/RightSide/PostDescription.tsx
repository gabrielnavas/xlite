import { styled } from "@mui/material";

type Props = {
  text: string;
  onClickUpdate: () => void
};

const ContainerDescription = styled('span')(({ theme }) => ({
  display: 'flex',
  minHeight: '5rem',
  padding: '0.5rem 0.5rem 0.5rem 0.5rem',
  marginTop: '0.5rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  borderRadius: '0.5rem',
}));

const Description = styled('span')(() => ({
  textWrap: "pretty",
  maxWidth: '25rem',
  wordWrap: "break-word",
}));

const PostDescription = ({ text, onClickUpdate }: Props) => {
  return (
    <ContainerDescription onClick={onClickUpdate}>
      <Description>
        {text}
      </Description>
    </ContainerDescription>
  )
}

export default PostDescription;