type Props = {
  username: string;
}

const style = {
  fontWeight: '200',
  color: 'gray'
} as React.CSSProperties;

const Username = ({ username }: Props) => {
  return (
    <span style={style}>{username}</span>
  )
}

export default Username;