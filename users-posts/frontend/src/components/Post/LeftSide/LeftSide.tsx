import { Avatar } from "@mui/material";

type Props = {
  avatarUrl: string;
}

const style = {
  padding: '0.75rem 1rem 1rem 0.50rem',
} as React.CSSProperties;

const LeftSide = ({avatarUrl}: Props) => {
  return (
    <section style={style}>
      <Avatar alt="Perfil image" src={avatarUrl} />
    </section>
  )
}

export default LeftSide;