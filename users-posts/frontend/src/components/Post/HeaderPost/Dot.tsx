const style = {
  fontWeight: '200',
  color: 'gray'
} as React.CSSProperties;

const Dot = () => {
  return (
    <span style={style}>{' · '}</span>
  )
}

export default Dot;