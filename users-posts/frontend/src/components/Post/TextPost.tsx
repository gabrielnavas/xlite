type Props = { 
  text: string;
};

const style = {
  padding: '0.5rem 0.5rem 0.5rem 0',
} as React.CSSProperties;

const TextPost = ({ text }: Props) => {
  return (
    <div style={style}>
      { text }
    </div>
  )
}

export default TextPost;