import { formatDistanceToNow } from "date-fns";

type Props = {
  datePost: string;
};

const style = {
  fontWeight: '200',
  color: 'gray'
} as React.CSSProperties;


const DatePost = ({ datePost }: Props) => {
  const date: string = formatDistanceToNow(new Date(datePost), { addSuffix: true });

  return (
    <span style={style}>
      {date}
    </span>
  )
}

export default DatePost;