import At from "./At";
import DatePost from "./DatePost";
import Dot from "./Dot";
import Name from "./Name";
import OptionsHeader from "./MenuHeader";
import Username from "./Username";

type Props = {
  name: string;
  username: string;
  datePost: Date;
}

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
} as React.CSSProperties;

const Header = ({ name, username, datePost }: Props) => {
  const postIsMyOwn = Math.floor(Math.random() * 2) > 0;

  const optionHeader = postIsMyOwn && (
    <span>
      <OptionsHeader />
    </span>
  )

  return (
    <header style={style}>
      <span>
        <Name name={name} />
        <At />
        <Username username={username} />
        <Dot />
        <DatePost datePost={datePost} />
      </span>
      {optionHeader}
    </header>
  )
}

export default Header;