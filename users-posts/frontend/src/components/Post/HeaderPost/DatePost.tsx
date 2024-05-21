import { formatDistanceToNow } from "date-fns";

type Props = {
  datePost: Date;
};

const style = {
  fontWeight: '200',
  color: 'gray'
} as React.CSSProperties;


const DatePost = ({ datePost }: Props) => {
  const date: string = formatDistanceToNow(datePost, { addSuffix: true });

  return (
    <span style={style}>
      {date}
    </span>
  )
}

export default DatePost;