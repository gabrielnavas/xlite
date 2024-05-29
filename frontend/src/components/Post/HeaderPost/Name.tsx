type Props = {
  name: string;
};

const Name = ({ name }: Props) => {
  return (
    <span>{`${name} `}</span>
  )
}

export default Name;