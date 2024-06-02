import At from "./At";
import DatePost from "./DatePost";
import Dot from "./Dot";
import Name from "./Name";
import MenuHeader from "./MenuHeader";
import Username from "./Username";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import localUserManager from "../../../services/LocalUserManager";

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

const DataHeader = styled('span')(({theme}) => ({
  paddingLeft: '0.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '0.75rem',
  },
}));

const HeaderPost = ({ name, username, datePost, openOnRemoveQuestionShield }: Props) => {
  const [isByOwn, setIsByOwn] = useState(false)

  useEffect(() => {
    localUserManager().getUserLogged().then(user => {
      if(user.username === username) {
        setIsByOwn(true)
      }
    })
  }, [username])

  const optionHeader = isByOwn && (
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