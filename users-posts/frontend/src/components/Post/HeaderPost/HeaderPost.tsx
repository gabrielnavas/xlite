import At from "./At";
import DatePost from "./DatePost";
import Dot from "./Dot";
import Name from "./Name";
import MenuHeader from "./MenuHeader";
import Username from "./Username";
import { styled } from "@mui/material";

type Props = {
  name: string;
  username: string;
  datePost: Date;
  openOnRemoveQuestionShield: () => void
}

const Container = styled('header')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const DataHeader = styled('span')(() => ({
  paddingLeft: '0.5rem'
}));

const HeaderPost = ({ name, username, datePost, openOnRemoveQuestionShield }: Props) => {
  const postIsMyOwn = Math.floor(Math.random() * 2) > 0;

  const optionHeader = postIsMyOwn && (
    <span>
      <MenuHeader
        openOnRemoveQuestionShield={openOnRemoveQuestionShield}
      />
    </span>
  )

  return (
    <Container>
      <DataHeader>
        <Name name={name} />
        <At />
        <Username username={username} />
        <Dot />
        <DatePost datePost={datePost} />
      </DataHeader>
      {optionHeader}
    </Container>
  )
}

export default HeaderPost;